"""
    simplex_heatmap(x::AbstractMatrix{Float64};
                    method = "square",
                    vertices = ["x₁", "x₂", "x₃"],
                    color = :jet,
                    args...)

Plot a simplex heatmap, cell (i,j) in the array `x` supplying the value at
the (i,j)th position. 

Two methods for plotting a heatmap are available. The default (`method = "square"`)
fills the simplex with squares. This works well if the dimensionality of `x` is high,
and is fast. The second method, (`method = "triangle"`) fills the simplex with
triangles. It is slow, particularly if the dimensionality of `x` is high.

Each method throws away values in `x` which correspond to combinations of coordinates
which lie outside the simplex.

Vertex labels are controlled with the `vertices` keyword
argument, color scheme with the `color` argument. Further keyword arguments are
passed to [`Plots.heatmap`](@extref).
"""
function simplex_heatmap(x::AbstractMatrix{Float64}; method = "square", vertices = default_vertices, color=:jet, args...)
    if method == "square"
        _heatmap_simplex_fast(x; vertices=vertices, color=color, args...)
    elseif method == "triangle"
        _heatmap_simplex_slow(x; vertices=vertices, color=color, args...)
    else
        error("Invalid 'method' provided; valid options are \"square\" and \"triangle\"")
    end
end


# "slow" version of heatmap code - fills the simplex with little triangles
#
function _heatmap_simplex_slow(x::AbstractMatrix{Float64}; vertices, color, args...)
    d = size(x, 1)

    upcounts = zeros(d,d)
    downcounts = zeros(d,d)

    z = zeros(d, d)

    points = (0:d) ./ d

    lp = length(points) - 1

    for i in 1:lp
        for j in 1:(lp-i)
            upcounts[i,j] = x[i,j]
            downcounts[i,j] = x[i,j]
        end
    end

    cols = Plots.cgrad(color, categorical=false)

    maxcol = length(cols) - 1
    maxval = maximum([maximum(upcounts), maximum(downcounts)])

    heatmap([-1, -2], [-1, -2], [1 maxcol+1; 1 1]; showaxis=false, grid=false, aspect_ratio=sqrt(3)/2, color=cols, args...)
    xlims!(-0.0, 1.2)
    ylims!(-0.025, 1.1)

    for i in 1:lp
        for j in 1:(lp-i+1)
            plot!(uptriangle(d, i+j-1, j), color=cols[trunc(Int, maxcol*(upcounts[i,j]/maxval) + 1)], lc=:match, lw=0.0, legend=false)
        end
    end

    for i in 1:lp
        for j in 1:(lp-i)
            plot!(downtriangle(d, i+j-1, j), color=cols[trunc(Int, maxcol*(downcounts[i,j]/maxval) + 1)], lc=:match, lw=0.0, legend=false)
        end
    end

    plot!([0.0, 1.0, 0.5, 0.0], [0.0, 0.0, 1.0, 0.0], color=:black, label=nothing)

    label_vertices!(vertices, [1,2,3])
end


# "fast" version of heatmap code - fills the simplex with little squares
#
function _heatmap_simplex_fast(x::AbstractMatrix{Float64}; vertices, args...)
    resolution = size(x, 1)

    z = convert(Matrix{Union{Missing, Float64}}, x)

    for i in 1:resolution
        for j in 1:resolution
            if i/resolution + j/resolution > 1
                z[i,j] = missing
            end
        end
    end

    z = LinearAlgebra.transpose(z)

    shiftz = copy(z)

    x = range(0.0, 1.0, size(z, 2))
    y = range(0.0, 1.0, size(z, 1))

    for i in 1:size(z, 1)
        shiftz[i,:] = circshift(z[i,:], trunc(i/2))
    end

    heatmap(x, y, shiftz, showaxis=false, grid=false, aspect_ratio=sqrt(3)/2; args...)
    xlims!(-0.0, 1.2)
    ylims!(-0.025, 1.1)

    plot!([0.0, 1.0, 0.5, 0.0], [0.0, 0.0, 1.0, 0.0], color=:black, label=nothing)

    label_vertices!(vertices, [1,2,3])
end
