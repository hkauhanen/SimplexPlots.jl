# from simplex coordinates to cartesian coordinates
#
function simp2cart(x::Vector{Float64})
    [x[1] + 0.5*x[2], x[2]]
end

function simp2cart(x::AbstractMatrix{Float64})
    hcat([simp2cart(x[i,:]) for i in 1:size(x, 1)]...)'
end


# create an upward-pointing triangle shape for a triangle mesh
# of resolution d, at location x,y
#
function uptriangle(d::Int, x::Int, y::Int)
    left = (0.0 + (x-1)*(1/d) - (y-1)*0.5*(1/d), 0.0 + (y-1)*(1/d))
    right = (0.0 + x*(1/d) - (y-1)*0.5*(1/d), 0.0 + (y-1)*(1/d))
    top = (left[1] + 0.5*(1/d), 0.0 + y*(1/d))
    Shape([left, top, right])
end


# create a downward-pointing triangle shape for a triangle mesh
# of resolution d, at location x,y
#
function downtriangle(d::Int, x::Int, y::Int)
    left = ((1/d) + (x-1)*(1/d) - y*0.5*(1/d), 0.0 + y*(1/d))
    right = ((1/d) + x*(1/d) - y*0.5*(1/d), 0.0 + y*(1/d))
    bot = (left[1] + 0.5*(1/d), 0.0 + (y-1)*(1/d))
    Shape([left, bot, right])
end


# label vertices
function label_vertices!(vertices, axes)
    if vertices != nothing
        annotate!(default_x1_x, default_x1_y, vertices[axes[1]])
        annotate!(default_x2_x, default_x2_y, vertices[axes[2]])
        annotate!(default_x3_x, default_x3_y, vertices[axes[3]])
    end
end


# order axes, cartesian coordinates
function order_axes!(x, axes)
    hcat(x[:, axes[1]], x[:, axes[2]])
end


# order axes, simplex coordinates
function order_axes_simplex!(x, axes)
    hcat(x[:, axes[1]], x[:, axes[2]], x[:, axes[3]])
end
