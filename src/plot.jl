"""
    simplex_plot!(x::AbstractMatrix{Float64};
                  axes = [1, 2, 3],
                  args...)

Like [`simplex_plot`](@ref), but adds to an existing plot.
"""
function simplex_plot!(x::AbstractMatrix{Float64}; axes = default_axes, args...)
    x = order_axes!(x, axes)
    y = simp2cart(x)
    plot!(y[:,1], y[:,2]; args...)
end


"""
    simplex_plot(x::AbstractMatrix{Float64};
                 vertices = ["x₁", "x₂", "x₃"],
                 axes = [1, 2, 3],
                 args...)

Plot vectors in `x`. Vertex labels can be set with the `vertices` keyword argument (set this to `nothing` to suppress vertex labels). Further keyword arguments are passed to [`RecipesBase.plot`](@extref).
"""
function simplex_plot(x::AbstractMatrix{Float64}; vertices = default_vertices, axes = default_axes, args...)
    plot([-1], [-2]; showaxis=false, grid=false, aspect_ratio=sqrt(3)/2, label=nothing)
    xlims!(-0.1, 1.2)
    ylims!(-0.025, 1.1)

    plot!([0.0, 1.0, 0.5, 0.0], [0.0, 0.0, 1.0, 0.0], color=:black, label=nothing)

    label_vertices!(vertices, axes)

    simplex_plot!(x; axes=axes, args...)
end


"""
    simplex_plot(x::Vector{Vector{Float64}};
                 vertices = ["x₁", "x₂", "x₃"],
                 axes = [1, 2, 3],
                 args...)
"""
simplex_plot(x::Vector{Vector{Float64}}; vertices = default_vertices, axes = default_axes, args...) = simplex_plot(LinearAlgebra.transpose(hcat(x...)); vertices=vertices, axes=axes, args...)


"""
    simplex_plot(x::Vector{Float64};
                 vertices = ["x₁", "x₂", "x₃"],
                 axes = [1, 2, 3]
                 args...)
"""
simplex_plot(x::Vector{Float64}; vertices = default_vertices, axes = default_axes, args...) = simplex_plot([x]; vertices=vertices, axes=axes, args...)


"""
    simplex_plot!(x::Vector{Vector{Float64}};
                  axes = [1, 2, 3],
                  args...)
"""
simplex_plot!(x::Vector{Vector{Float64}}; axes = default_axes, args...) = simplex_plot!(LinearAlgebra.transpose(hcat(x...)); axes=axes, args...)


"""
    simplex_plot!(x::Vector{Float64};
                  axes = [1, 2, 3],
                  args...)
"""
simplex_plot!(x::Vector{Float64}; axes = default_axes, args...) = simplex_plot!([x]; axes=axes, args...)


