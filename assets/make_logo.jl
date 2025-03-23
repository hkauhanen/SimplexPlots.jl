using Plots
using Random
using StatsBase

Random.seed!(12345)

include("../src/utils.jl")

logocolors = Colors.JULIA_LOGO_COLORS

col = [logocolors.red, logocolors.green, logocolors.purple, logocolors.blue]

plot([0.0, 1.0, 0.5, 0.0], [0.0, 0.0, 1.0, 0.0]; showaxis=false, grid=false, aspect_ratio=sqrt(3)/2, label=false, color=:black, lw=5.0, background_color=:transparent)

res = 7

w = Weights([3, 3, 3, 1])

for j in 1:res
    for i in j:res
        plot!(uptriangle(res, i, j), label=false, color=sample(col, w), lc=:match, lw=0.0)
    end
end

for j in 1:(res-1)
    for i in j:(res-1)
        plot!(downtriangle(res, i, j), label=false, color=sample(col, w), lc=:match, lw=0.0)
    end
end

plot!()

savefig("logo.png")
