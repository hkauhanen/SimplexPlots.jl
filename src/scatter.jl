"""
    simplex_scatter!(x::AbstractMatrix{Float64};
                     axes = [1, 2, 3],
                     args...)

Like [`simplex_scatter`](@ref), but adds to an existing plot.
"""
function simplex_scatter!(x::AbstractMatrix{Float64}; axes = default_axes, args...)
    x = order_axes!(x, axes)
    y = simp2cart(x)
    scatter!(y[:,1], y[:,2]; args...)
end


"""
    simplex_scatter(x::AbstractMatrix{Float64};
                    vertices = ["x₁", "x₂", "x₃"],
                    axes = [1, 2, 3],
                    args...)

Scatterplot of the vectors in `x`. Vertex labels can be set using the `vertices` keyword argument (set this to `nothing` to suppress vertex labels). Further keyword arguments are passed to [`Plots.scatter`](@extref).
"""
function simplex_scatter(x::AbstractMatrix{Float64}; vertices = default_vertices, axes = default_axes, args...)
    plot([-1], [-2]; showaxis=false, grid=false, aspect_ratio=sqrt(3)/2, label=nothing)
    xlims!(-0.1, 1.2)
    ylims!(-0.025, 1.1)

    plot!([0.0, 1.0, 0.5, 0.0], [0.0, 0.0, 1.0, 0.0], color=:black, label=nothing)

    label_vertices!(vertices, axes)

    simplex_scatter!(x; axes = axes, args...)
end


"""
    simplex_scatter(x::Vector{Vector{Float64}};
                    vertices = ["x₁", "x₂", "x₃"],
                    axes = [1, 2, 3],
                    args...)
"""
simplex_scatter(x::Vector{Vector{Float64}}; vertices = default_vertices, axes = default_axes, args...) = simplex_scatter(LinearAlgebra.transpose(hcat(x...)); vertices=vertices, axes=axes, args...)


"""
    simplex_scatter(x::Vector{Float64};
                    vertices = ["x₁", "x₂", "x₃"],
                    axes = [1, 2, 3],
                    args...)
"""
simplex_scatter(x::Vector{Float64}; vertices = default_vertices, axes = default_axes, args...) = simplex_scatter([x]; vertices=vertices, axes=axes, args...)


"""
    simplex_scatter!(x::Vector{Vector{Float64}};
                     axes = [1, 2, 3],
                     args...)
"""
simplex_scatter!(x::Vector{Vector{Float64}}; axes = default_axes, args...) = simplex_scatter!(LinearAlgebra.transpose(hcat(x...)); axes=axes, args...)


"""
    simplex_scatter!(x::Vector{Float64};
                     axes = [1, 2, 3],
                     args...)
"""
simplex_scatter!(x::Vector{Float64}; axes = default_axes, args...) = simplex_scatter!([x]; axes=axes, args...)


