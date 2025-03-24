var documenterSearchIndex = {"docs":
[{"location":"guide/#Guide","page":"Guide","title":"Guide","text":"","category":"section"},{"location":"guide/","page":"Guide","title":"Guide","text":"using Random\nRandom.seed!(123)","category":"page"},{"location":"guide/#Introduction","page":"Guide","title":"Introduction","text":"","category":"section"},{"location":"guide/","page":"Guide","title":"Guide","text":"Mathematically, the (n-1)-dimensional simplex is the subset of mathbbR^n whose points mathbfx = (x_1 ldots  x_n) satisfy the following conditions:","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"x_i geq 0 for all i = 1 ldots  n\nsum_i=1^n x_i = 1","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"In the n=3 case, this set looks as follows:","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"(Image: )","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"Since the simplex itself is a two-dimensional structure in this case, we can \"lift\" it out of the three-dimensional Euclidean space and visualize it in the plane:","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"(Image: )","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"Each vertex of this triangle corresponds to one of the standard basis vectors of mathbbR^3, i.e. x_i = 1 for some i (and, by implication, x_j = 0 for all j neq i). The point in the middle is the maximum-entropy state or barycentre (13 13 13).","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"One may equivalently think of the simplex as the set of all possible categorical probability distributions over n options, such that x_i gives the probability of the ith option.","category":"page"},{"location":"guide/#Installation-and-usage","page":"Guide","title":"Installation and usage","text":"","category":"section"},{"location":"guide/","page":"Guide","title":"Guide","text":"To install SimplexPlots.jl:","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"]add https://github.com/hkauhanen/SimplexPlots.jl","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"To load it:","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"using Plots\nusing SimplexPlots","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"warning: Warning\nSimplexPlots.jl does not import routines defined in Plots.jl. In practical terms, this means that if you wish to make use of functionality provided by the latter (such as saving figures into files) you will need to be using both packages, as above.","category":"page"},{"location":"guide/#Scatterplots-and-lineplots","page":"Guide","title":"Scatterplots and lineplots","text":"","category":"section"},{"location":"guide/","page":"Guide","title":"Guide","text":"The functions simplex_scatter and simplex_plot accept a column vector, a row vector, a matrix, or a vector of column vectors as input:","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"myvector = [0.1, 0.1, 0.8]\n\nsimplex_scatter(myvector)\n\nsavefig(\"scatter1.png\") # hide\nnothing # hide","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"(Image: )","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"myvector = [0.1 0.1 0.8]\n\nsimplex_scatter(myvector)\n\nsavefig(\"scatter1b.png\") # hide\nnothing # hide","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"(Image: )","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"mymatrix = [0.1 0.1 0.8\n            0.1 0.8 0.1\n            0.8 0.1 0.1]\n\nsimplex_scatter(mymatrix)\n\nsavefig(\"scatter2.png\") # hide\nnothing # hide","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"(Image: )","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"myvecs = [[0.1, 0.1, 0.8], [0.1, 0.8, 0.1], [0.8, 0.1, 0.1]]\n\nsimplex_scatter(myvecs)\n\nsavefig(\"scatter2b.png\") # hide\nnothing # hide","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"(Image: )","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"note: Note\nThis multitude of input formats is deliberate, as it allows the output of many kinds of data-generating routines to be fed directly into SimplexPlots.jl. We will see examples of this throughout the Guide.Internally, all input types are transformed into a matrix of three columns before plotting.","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"These functions accept the arguments accepted by Plots.jl's plot and scatter. For instance:","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"mymatrix = [0.1 0.1 0.8\n            0.3 0.4 0.3\n            0.2 0.6 0.2\n            0.1 0.7 0.2\n            0.0 0.8 0.2\n            0.0 1.0 0.0]\n\nsimplex_plot(mymatrix; label=nothing, linewidth=4.0, color=:blue)\n\nsavefig(\"scatter3.png\") # hide\nnothing # hide","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"(Image: )","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"Furthermore, a vertices keyword argument is provided which sets the labels on the vertices of the simplex. For instance:","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"using LaTeXStrings\n\nmymatrix = [0.1 0.1 0.8\n            0.3 0.4 0.3\n            0.2 0.6 0.2\n            0.1 0.7 0.2\n            0.0 0.8 0.2\n            0.0 1.0 0.0]\n\nsimplex_plot(mymatrix; label=nothing, linewidth=4.0, color=:blue,\n                       vertices = [L\"x_1\", L\"x_2\", L\"x_3\"])\n\nsavefig(\"scatter4.png\") # hide\nnothing # hide","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"(Image: )","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"For a more interesting example, let's plot the solution of a dynamical system.","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"# we will use DifferentialEquations.jl to obtain the solution\n# (see https://docs.sciml.ai/DiffEqDocs/stable/getting_started/)\nusing DifferentialEquations\nusing LinearAlgebra\n\n# the replicator dynamic (see https://en.wikipedia.org/wiki/Replicator_equation)\nreplicator(u, A, t) = u .* (A*u .- transpose(u)*A*u)\n\n# rock-paper-scissors payoff matrix\nRPS = [ 0  -1   1\n        1   0  -1\n       -1   1   0 ]\n\n# set up the problem\nu0 = [0.2, 0.2, 0.6]\ntspan = (0.0, 15.0)\nprob = ODEProblem(replicator, u0, tspan, RPS)\n\n# obtain solution\nsol = solve(prob, saveat=0.1)\n\n# plot solution\nsimplex_plot(sol.u; \n             vertices = [L\"u_1\", L\"u_2\", L\"u_3\"],\n             color = :black,\n             linewidth = 3.0,\n             title = \"Rock-Paper-Scissors in Replicator Dynamics\",\n             label = nothing)\n\nsavefig(\"solution.png\") # hide\nnothing # hide","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"(Image: )","category":"page"},{"location":"guide/#Histograms","page":"Guide","title":"Histograms","text":"","category":"section"},{"location":"guide/","page":"Guide","title":"Guide","text":"To illustrate the plotting of histograms, we will create a Dirichlet distribution and sample random variates from it. Here is the definition of the distribution:","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"using Distributions\n\ndir = Dirichlet(5 .* ones(3))","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"Random variates can be obtained using the rand function. To obtain, say, 10,000 random vectors, we call:","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"some_random_vectors = rand(dir, 10_000)","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"These can be passed to simplex_histogram to obtain a histogram:","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"simplex_histogram(some_random_vectors)\n\nsavefig(\"histo1.png\") # hide\nnothing # hide","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"(Image: )","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"Adding more random vectors gives us a smoother picture of the underlying distribution:","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"simplex_histogram(rand(dir, 100_000))\n\nsavefig(\"histo2.png\") # hide\nnothing # hide","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"(Image: )","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"The bins keyword argument can be used to control the number of triangular histogram bins:","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"simplex_histogram(rand(dir, 100_000); bins=10)\n\nsavefig(\"histo3.png\") # hide\nnothing # hide","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"(Image: )","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"simplex_histogram(rand(dir, 1_000_000); bins=100)\n\nsavefig(\"histo4.png\") # hide\nnothing # hide","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"(Image: )","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"note: Note\nTechnically, bins is not the number of bins in the simplex, but rather  the \"resolution\" along any of its three sides.)","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"warning: Warning\nExpect long execution times when the number of bins is large!","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"The vertices and color arguments can be used to change the labelling of the vertices and the color gradient:","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"using LaTeXStrings\n\nsimplex_histogram(rand(dir, 10_000);\n                  bins=20,\n                  vertices = [L\"\\xi_1\", L\"\\xi_2\", L\"\\xi_3\"],\n                  color = :Pastel1_3)\n\nsavefig(\"histo5.png\") # hide\nnothing # hide","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"(Image: )","category":"page"},{"location":"guide/#Heatmaps","page":"Guide","title":"Heatmaps","text":"","category":"section"},{"location":"guide/","page":"Guide","title":"Guide","text":"For heatmaps, two plotting strategies are provided. By default, the function simplex_heatmap will fill the triangle with small squares. This is very fast but looks dreadful if the resolution of the heatmap is low, i.e. if there are not very many squares. The other option is to fill the simplex with little triangles, much like the histogramming function does. This tends to produce more visually pleasing results, especially when resolution is low, but is very slow to execute as resolution grows.","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"To illustrate these differences, we will plot the pdf (probability density function) of the Dirichlet distribution dir created above, at different resolutions, using the two methods.","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"First, the \"fast\" square method:","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"resolution = 0.1\nmysequence = 0.0:resolution:1.0\n\ngrid = [pdf(dir, [x, y, 1-x-y]) for x in mysequence, y in mysequence]\n\nsimplex_heatmap(grid)\n\nsavefig(\"heat1.png\") # hide\nnothing # hide","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"(Image: )","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"Obviously, filling the triangle with squares is difficult if the squares are too large... However, with higher resolutions this works well:","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"resolution = 0.001\nmysequence = 0.0:resolution:1.0\n\ngrid = [pdf(dir, [x, y, 1-x-y]) for x in mysequence, y in mysequence]\n\nsimplex_heatmap(grid)\n\nsavefig(\"heat2.png\") # hide\nnothing # hide","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"(Image: )","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"By contrast, here is the result when using the slower triangle method. To use this, specify the method = \"triangle\" keyword argument:","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"resolution = 0.02\nmysequence = 0.0:resolution:1.0\n\ngrid = [pdf(dir, [x, y, 1-x-y]) for x in mysequence, y in mysequence]\n\nsimplex_heatmap(grid; method = \"triangle\")\n\nsavefig(\"heat3.png\") # hide\nnothing # hide","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"(Image: )","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"danger: Danger\nThe method = \"triangle\" option is experimental. Expect, certainly, long execution times if the heatmap resolution is large, and, possibly, illogical behaviour.","category":"page"},{"location":"guide/#Adding-to-plots","page":"Guide","title":"Adding to plots","text":"","category":"section"},{"location":"guide/","page":"Guide","title":"Guide","text":"SimplexPlots.jl also provides exclamation-marked versions of simplex_plot and simplex_scatter. This means you can add content to an already existing plot. This way we can combine, for instance, the solution of the Rock-Paper-Scissors dynamics and one of the histograms from above:","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"simplex_histogram(rand(dir, 10_000);\n                  bins=20,\n                  vertices = [L\"u_1\", L\"u_2\", L\"u_3\"],\n                  color = :Pastel1_3)\n\nsimplex_plot!(sol.u; \n              color = :black,\n              linewidth = 3.0,\n              label = nothing)\n\nsavefig(\"combo.png\") # hide\nnothing # hide","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"(Image: )","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"Or we can illustrate several solutions of rock-paper-scissors in a single plot:","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"u0 = [0.1, 0.1, 0.8]\nprob1 = ODEProblem(replicator, u0, tspan, RPS)\n\nu0 = [0.2, 0.2, 0.6]\nprob2 = ODEProblem(replicator, u0, tspan, RPS)\n\nu0 = [0.3, 0.3, 0.4]\nprob3 = ODEProblem(replicator, u0, tspan, RPS)\n\nsol1 = solve(prob1, saveat=0.1)\nsol2 = solve(prob2, saveat=0.1)\nsol3 = solve(prob3, saveat=0.1)\n\nsimplex_plot(sol1.u; \n             vertices = [L\"u_1\", L\"u_2\", L\"u_3\"],\n             color = :red,\n             linewidth = 3.0,\n             label = \"solution 1\")\n\nsimplex_plot!(sol2.u;\n              color = :green,\n              linewidth = 3.0,\n              label = \"solution 2\")\n\nsimplex_plot!(sol3.u;\n              color = :blue,\n              linewidth = 3.0,\n              label = \"solution 3\")\n\nsavefig(\"solutions.png\") # hide\nnothing # hide","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"(Image: )","category":"page"},{"location":"guide/#Axis-orientation","page":"Guide","title":"Axis orientation","text":"","category":"section"},{"location":"guide/","page":"Guide","title":"Guide","text":"The vertices of the simplex are labelled using the strings in the vertices keyword argument. By default, this is done counter-clockwise starting from the rightmost vertex. To control this order, each SimplexPlots.jl method – with the exception of simplex_heatmap – accepts an axes keyword argument which specifies the axis order, the default being axes = [1, 2, 3]. Witness:","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"mymatrix = [0.1 0.1 0.8\n            0.3 0.4 0.3\n            0.2 0.6 0.2\n            0.1 0.7 0.2\n            0.0 0.8 0.2\n            0.0 1.0 0.0]\n\nsimplex_plot(mymatrix; label=nothing, linewidth=4.0, color=:blue, axes = [1, 2, 3])\n\nsavefig(\"axes1.png\") # hide\nnothing # hide","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"(Image: )","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"simplex_plot(mymatrix; label=nothing, linewidth=4.0, color=:blue, axes = [2, 1, 3])\n\nsavefig(\"axes2.png\") # hide\nnothing # hide","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"(Image: )","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"simplex_plot(mymatrix; label=nothing, linewidth=4.0, color=:blue, axes = [3, 1, 2])\n\nsavefig(\"axes3.png\") # hide\nnothing # hide","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"(Image: )","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"warning: Warning\nChanging the vertex labels does not reorder the axes. Only specifying the axes keyword argument does so!","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"With heatmaps, currently the only way of changing the axes is by modifying the input itself, along with the requisite modification to the vertices argument. For instance:","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"dir = Dirichlet([9.0, 6.0, 3.0])\n\nresolution = 0.001\nmysequence = 0.0:resolution:1.0\n\ngrid1 = [pdf(dir, [x, y, 1-x-y]) for x in mysequence, y in mysequence]\n\nsimplex_heatmap(grid1; vertices = [\"x\", \"y\", \"z\"])\n\nsavefig(\"heataxes1.png\") # hide\nnothing # hide","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"(Image: )","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"grid2 = [pdf(dir, [y, x, 1-x-y]) for x in mysequence, y in mysequence]\n\nsimplex_heatmap(grid2; vertices = [\"y\", \"x\", \"z\"])\n\nsavefig(\"heataxes2.png\") # hide\nnothing # hide","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"(Image: )","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"grid3 = [pdf(dir, [1-y-z, y, z]) for z in mysequence, y in mysequence]\n\nsimplex_heatmap(grid3; vertices = [\"z\", \"y\", \"x\"])\n\nsavefig(\"heataxes3.png\") # hide\nnothing # hide","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"(Image: )","category":"page"},{"location":"guide/","page":"Guide","title":"Guide","text":"This is likely to change in a future version.","category":"page"},{"location":"reference/#Reference","page":"Reference","title":"Reference","text":"","category":"section"},{"location":"reference/","page":"Reference","title":"Reference","text":"simplex_plot\nsimplex_plot!\nsimplex_scatter\nsimplex_scatter!\nsimplex_histogram\nsimplex_heatmap","category":"page"},{"location":"reference/#SimplexPlots.simplex_plot","page":"Reference","title":"SimplexPlots.simplex_plot","text":"simplex_plot(x::AbstractMatrix{Float64};\n             vertices = [\"x₁\", \"x₂\", \"x₃\"],\n             axes = [1, 2, 3],\n             args...)\n\nPlot vectors in x. Vertex labels can be set with the vertices keyword argument (set this to nothing to suppress vertex labels). Further keyword arguments are passed to RecipesBase.plot.\n\n\n\n\n\nsimplex_plot(x::Vector{Vector{Float64}};\n             vertices = [\"x₁\", \"x₂\", \"x₃\"],\n             axes = [1, 2, 3],\n             args...)\n\n\n\n\n\nsimplex_plot(x::Vector{Float64};\n             vertices = [\"x₁\", \"x₂\", \"x₃\"],\n             axes = [1, 2, 3]\n             args...)\n\n\n\n\n\n","category":"function"},{"location":"reference/#SimplexPlots.simplex_plot!","page":"Reference","title":"SimplexPlots.simplex_plot!","text":"simplex_plot!(x::AbstractMatrix{Float64};\n              axes = [1, 2, 3],\n              args...)\n\nLike simplex_plot, but adds to an existing plot.\n\n\n\n\n\nsimplex_plot!(x::Vector{Vector{Float64}};\n              axes = [1, 2, 3],\n              args...)\n\n\n\n\n\nsimplex_plot!(x::Vector{Float64};\n              axes = [1, 2, 3],\n              args...)\n\n\n\n\n\n","category":"function"},{"location":"reference/#SimplexPlots.simplex_scatter","page":"Reference","title":"SimplexPlots.simplex_scatter","text":"simplex_scatter(x::AbstractMatrix{Float64};\n                vertices = [\"x₁\", \"x₂\", \"x₃\"],\n                axes = [1, 2, 3],\n                args...)\n\nScatterplot of the vectors in x. Vertex labels can be set using the vertices keyword argument (set this to nothing to suppress vertex labels). Further keyword arguments are passed to Plots.scatter.\n\n\n\n\n\nsimplex_scatter(x::Vector{Vector{Float64}};\n                vertices = [\"x₁\", \"x₂\", \"x₃\"],\n                axes = [1, 2, 3],\n                args...)\n\n\n\n\n\nsimplex_scatter(x::Vector{Float64};\n                vertices = [\"x₁\", \"x₂\", \"x₃\"],\n                axes = [1, 2, 3],\n                args...)\n\n\n\n\n\n","category":"function"},{"location":"reference/#SimplexPlots.simplex_scatter!","page":"Reference","title":"SimplexPlots.simplex_scatter!","text":"simplex_scatter!(x::AbstractMatrix{Float64};\n                 axes = [1, 2, 3],\n                 args...)\n\nLike simplex_scatter, but adds to an existing plot.\n\n\n\n\n\nsimplex_scatter!(x::Vector{Vector{Float64}};\n                 axes = [1, 2, 3],\n                 args...)\n\n\n\n\n\nsimplex_scatter!(x::Vector{Float64};\n                 axes = [1, 2, 3],\n                 args...)\n\n\n\n\n\n","category":"function"},{"location":"reference/#SimplexPlots.simplex_histogram","page":"Reference","title":"SimplexPlots.simplex_histogram","text":"simplex_histogram(x::AbstractMatrix{Float64};\n                  bins = 50,\n                  vertices = [\"x₁\", \"x₂\", \"x₃\"],\n                  axes = [1, 2, 3]\n                  color = :jet,\n                  args...)\n\nPlots a simplex histogram of the vectors in x (row or column, depending on the orientation of the matrix x). The keyword arguments are:\n\nbins: resolution of histogram (number of triangular bins along each edge of the simplex)\nvertices: labels at the vertices of the simplex (set to nothing to suppress the labels)\naxes: axis ordering\ncolor: colorscheme for the color gradient\n\nFurther keyword arguments are passed to Plots.histogram.\n\n\n\n\n\nsimplex_histogram(x::Vector{Vector{Float64}};\n                  bins = 50,\n                  vertices = [\"x₁\", \"x₂\", \"x₃\"],\n                  axes = [1, 2, 3],\n                  color = :jet,\n                  args...)\n\n\n\n\n\n","category":"function"},{"location":"reference/#SimplexPlots.simplex_heatmap","page":"Reference","title":"SimplexPlots.simplex_heatmap","text":"simplex_heatmap(x::AbstractMatrix{Float64};\n                method = \"square\",\n                vertices = [\"x₁\", \"x₂\", \"x₃\"],\n                color = :jet,\n                args...)\n\nPlot a simplex heatmap, cell (i,j) in the array x supplying the value at the (i,j)th position. \n\nTwo methods for plotting a heatmap are available. The default (method = \"square\") fills the simplex with squares. This works well if the dimensionality of x is high, and is fast. The second method, (method = \"triangle\") fills the simplex with triangles. It is slow, particularly if the dimensionality of x is high.\n\nEach method throws away values in x which correspond to combinations of coordinates which lie outside the simplex.\n\nVertex labels are controlled with the vertices keyword argument, color scheme with the color argument. Further keyword arguments are passed to Plots.heatmap.\n\n\n\n\n\n","category":"function"},{"location":"#SimplexPlots-Documentation","page":"Home","title":"SimplexPlots Documentation","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"SimplexPlots.jl provides functions for plotting simple simplex plots (also known as ternary plots, Gibbs triangles or de Finetti diagrams depending on your field).","category":"page"},{"location":"","page":"Home","title":"Home","text":"SimplexPlots.jl is based on the Plots.jl ecosystem. Currently, three types of plot are supported: scatterplots (points/lines), histograms and heatmaps. The use of these is documented in the Guide.","category":"page"},{"location":"","page":"Home","title":"Home","text":"Please submit bugs as Issues through the GitHub repository.","category":"page"}]
}
