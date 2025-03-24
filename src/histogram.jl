
"""
    simplex_histogram(x::AbstractMatrix{Float64};
                      bins = 50,
                      vertices = ["x₁", "x₂", "x₃"],
                      axes = [1, 2, 3]
                      color = :jet,
                      args...)

Plots a simplex histogram of the vectors in `x` (row or column, depending on the orientation of the matrix `x`). The keyword arguments are:

- `bins`: resolution of histogram (number of triangular bins along each edge of the simplex)
- `vertices`: labels at the vertices of the simplex (set to `nothing` to suppress the labels)
- `axes`: axis ordering
- `color`: colorscheme for the color gradient

Further keyword arguments are passed to [`Plots.histogram`](@extref).
"""
function simplex_histogram(x::AbstractMatrix{Float64}; bins = 50, vertices = default_vertices, axes = default_axes, color=:jet, args...)

    if size(x, 1) == 3
        x = LinearAlgebra.transpose(x)
    end

    x = order_axes!(x, axes)

    d = bins

    upcounts = trunc.(Int, zeros(d,d))
    downcounts = trunc.(Int, zeros(d,d))

    z = zeros(d, d)

    points = (0:d) ./ d

    lp = length(points) - 1

    for i in 1:lp
        for j in 1:lp
            for r in 1:size(x, 1)
                if points[i] <= x[r,1] < points[i+1] &&
                    points[j] <= x[r,2] < points[j+1]
                    if sqrt((x[r,1] - points[i])^2 + (x[r,2] - points[j])^2) < sqrt((x[r,1] - points[i+1])^2 + (x[r,2] - points[j+1])^2)
                        upcounts[i,j] += 1
                    else
                        downcounts[i,j] += 1
                    end
                end
            end
        end
    end

    maxiup = maximum(maximum(maximum(upcounts)))
    maxidown = maximum(maximum(maximum(downcounts)))
    maxi = maximum([maxiup, maxidown])

    cols = Plots.cgrad(color, maxi + 1, categorical=true)

    heatmap([-1, -2], [-1, -2], [1 maxi+1; 1 1]; showaxis=false, grid=false, aspect_ratio=sqrt(3)/2, color=cols, args...)
    xlims!(-0.0, 1.2)
    ylims!(-0.025, 1.1)

    for i in 1:lp
        for j in 1:(lp-i+1)
            plot!(uptriangle(d, i+j-1, j), color=cols[upcounts[i,j] + 1], lc=:match, lw=0.0, legend=false)
        end
    end

    for i in 1:lp
        for j in 1:(lp-i)
            plot!(downtriangle(d, i+j-1, j), color=cols[downcounts[i,j] + 1], lc=:match, lw=0.0, legend=false)
        end
    end

    plot!([0.0, 1.0, 0.5, 0.0], [0.0, 0.0, 1.0, 0.0], color=:black, label=nothing)

    label_vertices!(vertices, axes)
end


"""
    simplex_histogram(x::Vector{Vector{Float64}};
                      bins = 50,
                      vertices = ["x₁", "x₂", "x₃"],
                      axes = [1, 2, 3],
                      color = :jet,
                      args...)
"""
simplex_histogram(x::Vector{Vector{Float64}}; bins = 50, vertices = default_vertices, axes = default_axes, color=:jet, args...) = simplex_histogram(LinearAlgebra.transpose(hcat(x...)); bins=bins, vertices=vertices, axes=axes, color=color, args...)
