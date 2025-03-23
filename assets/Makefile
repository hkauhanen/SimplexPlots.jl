.PHONY : all

all : simplex-1.png simplex3D-1.png logo.png

simplex-1.png : simplex.tex
	pdflatex simplex
	pdftocairo -png -r 150 simplex.pdf
	cp simplex-1.png ../docs/src/assets

simplex3D-1.png : simplex3D.tex
	pdflatex simplex3D
	pdftocairo -png -r 150 simplex3D.pdf
	cp simplex3D-1.png ../docs/src/assets

logo.png : make_logo.jl
	julia make_logo.jl
	cp logo.png ../docs/src/assets
