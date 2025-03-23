module SimplexPlots

using LinearAlgebra
using Plots

include("constants.jl")
include("utils.jl")
include("heatmap.jl")
include("histogram.jl")
include("plot.jl")
include("scatter.jl")

export simplex_heatmap
export simplex_heatmap!

export simplex_histogram
export simplex_histogram!

export simplex_plot
export simplex_plot!

export simplex_scatter
export simplex_scatter!

end
