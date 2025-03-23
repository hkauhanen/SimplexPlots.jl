using Luxor
using MathTeXEngine
using LaTeXStrings

Drawing(500, 500, "test.png")

origin()
setcolor("black")

# x axis
move(Point(-200, 0))
line(Point(170, 0))
closepath()
strokepath()

# y axis
move(Point(-30, -200))
line(Point(-30, 170))
closepath()
strokepath()

# z axis
move(Point(100, -130))
line(Point(-170, 140))
closepath()
strokepath()

# simplex
move(Point(-30, -150))
line(Point(120, 0))
line(Point(-100, 70))
line(Point(-30, -150))
setcolor("purple")
setopacity(0.5)
closepath()
fillpreserve()

setcolor("black")
fontsize(20)

move(Point(-35, -150))
line(Point(-25, -150))
closepath()
strokepath()
text(L"1", Point(-55, -145))
text(L"x_2", Point(-55, -200))

move(Point(120, 5))
line(Point(120, -5))
closepath()
strokepath()
text(L"1", Point(115, 25))
text(L"x_1", Point(165, 20))

move(Point(-105, 65))
line(Point(-95, 75))
closepath()
strokepath()
text(L"1", Point(-95, 95))
text(L"x_3", Point(-165, 155))


finish()
preview()
