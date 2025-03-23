#push!(LOAD_PATH,"../src/")

using Documenter, DocumenterInterLinks, SimplexPlots

links = InterLinks(
    "Plots" => "https://docs.juliaplots.org/stable/objects.inv"
)

makedocs(sitename="SimplexPlots.jl",
         pages = [
                  "Home" => "index.md",
                  "Guide" => "guide.md",
                  "Reference" => "reference.md"
                 ],
         plugins = [links])
         #remotes = nothing)

deploydocs(
    repo = "github.com/hkauhanen/SimplexPlots.jl.git",
    target = "build"
)
