import { useEffect, useRef } from 'react';
import {getNextMove} from '../API/chessAPI'
export function ChessBoard(){
    const canvasRef = useRef(null);
    const tileSize = 66;
    let state = [
        [null, null, null, "K", null, null, "n", "r"],
        [null, "p", "Q", null, null, null, "p", "p"],
        [null, null, null, null, 'N', null, null, null],
        [null, null, null, "K", null, "p", "N", null],
        ["p", "K", "Q", null, null, "R", null, null],
        [null, null, null, null, "p", "B", null, null],
        ["P", "P", "P", "P", "P", "P", "P", "P"],
        ["R", "N", "B", "Q", "K", "B", "N", "R"]
    ];
    /*let state = [
        ["r", "n", "b", "q", "k", "b", "n", "r"],
        ["p", "p", "p", "p", "p", "p", "p", "p"],
        [null, null, null, null, 'N', null, null, null],
        [null, null, null, "R", null, "p", "N", null],
        ["p", "B", "N", null, null, "R", null, null],
        [null, null, null, null, "p", "B", null, null],
        ["P", "P", "P", "P", "P", "P", "P", "P"],
        ["R", "N", "B", "Q", "K", "B", "N", "R"]
    ];*/
    let highlitedTiles: [number, number][] = []; //set inside highlightMoves(), emptied in deHighlightTiles()
    let selectedPiece: [number, number] = [-1, -1]; //set inside highlightMoves(), reset in deHighlightTiles()
    let canvas:any;
    let context:any;

    useEffect(() => {
        canvas = canvasRef.current;
        context = canvas.getContext('2d');
        context.font = "60px serif";
        renderBoard();
        renderPieces(state);
    }, []);

    const renderBoard = () => {
        context.fillStyle = '#f0f0f0';
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);
        context.fillStyle = '#000000';
        for (let i = 0; i < 8; ++i) {
            for (let j = 0; j < 8; ++j) {
                if ((i + j) % 2 == 1) {
                    context.fillRect(i * tileSize, j * tileSize, tileSize, tileSize);
                }
            }
        }
    };

    const renderPieces = (state:any) => {
        for (let i = 0; i < 8; ++i) {
            for (let j = 0; j < 8; ++j) {
                renderPiece(i, j, state);
            }
        }
    };

    const renderPiece = (xTile: number, yTile: number, state: any) => {
        if (state[yTile][xTile] != null) {
            context.fillStyle = '#ff0000';
            context.fillText(state[yTile][xTile], xTile * tileSize + 15, yTile * tileSize + 45, 60);
        }
    };

    const highlightTile = (xTile: number, yTile: number, state: any) => {
        if ((xTile + yTile) % 2 == 0) {
            context.fillStyle = '#74b76f';
        } else {
            context.fillStyle = '#416b3e'
        }

        context.fillRect(xTile * tileSize, yTile * tileSize, tileSize, tileSize);

        if (state[yTile][xTile] != null) {
            renderPiece(xTile, yTile, state);
        }
        highlitedTiles.push([xTile, yTile]);
    };

    const deHighlightTiles = (highlightedTiles:[number,number][], state:any) => {
        highlightedTiles.forEach((tileXY) => {
            if ((tileXY[0] + tileXY[1]) % 2 == 1) {
                context.fillStyle = '#000000';
            }else
                context.fillStyle = '#f0f0f0';

            context.fillRect(tileXY[0] * tileSize, tileXY[1] * tileSize, tileSize, tileSize);
            renderPiece(tileXY[0], tileXY[1], state);
        });
        selectedPiece = [-1, -1];
        highlightedTiles.length = 0;
    };

    const highlightMoves = (xTile: number, yTile: number, state: any) => {

        //what happens if pawn tries to attack to the right side while at possition (7,1)
        switch (state[yTile][xTile]) {
            case 'P'://PAWN
                highlightTile(xTile, yTile, state);
                selectedPiece = [xTile, yTile];
                    //handle move
                if (state[yTile - 1][xTile] == null)
                    highlightTile(xTile, yTile - 1, state);

                    //handle first move
                if (yTile == 6 && state[yTile - 2][xTile] == null && state[yTile - 1][xTile] == null)
                    highlightTile(xTile, yTile - 2, state);

                    //handle attacking
                if (state[yTile - 1][xTile + 1] != null && state[yTile - 1][xTile + 1] != state[yTile - 1][xTile + 1].toUpperCase())
                    highlightTile(xTile + 1, yTile - 1, state);
                if (state[yTile - 1][xTile - 1] != null && state[yTile - 1][xTile - 1] != state[yTile - 1][xTile - 1].toUpperCase())
                    highlightTile(xTile - 1, yTile - 1, state);
                break;
            case 'R': //ROOK
                highlightTile(xTile, yTile, state);
                selectedPiece = [xTile, yTile];
                    //handle moving down
                for (let i = yTile + 1; i < 8; ++i) {
                    if (state[i][xTile] == null) {
                        highlightTile(xTile, i, state);
                    } else if (state[i][xTile].toUpperCase() == state[i][xTile]) {
                        break;
                    } else {
                        highlightTile(xTile, i, state);
                        break;
                    }
                }
                    //handle moving up
                for (let i = yTile  - 1; i >= 0; --i) {
                    if (state[i][xTile] == null) {
                        highlightTile(xTile, i, state);
                    } else if (state[i][xTile].toUpperCase() == state[i][xTile]) {
                        break;
                    } else {
                        highlightTile(xTile, i, state);
                        break;
                    }
                }
                    //handle moving right
                for (let i = xTile + 1; i < 8; ++i) {
                    if (state[yTile][i] == null) {
                        highlightTile(i, yTile, state);
                    } else if (state[yTile][i].toUpperCase() == state[yTile][i]) {
                        break;
                    } else {
                        highlightTile(i, yTile, state);
                        break;
                    }
                }
                    //handle moving left
                for (let i = xTile - 1; i >= 0; --i) {
                    if (state[yTile][i] == null) {
                        highlightTile(i, yTile, state);
                    } else if (state[yTile][i].toUpperCase() == state[yTile][i]) {
                        break;
                    } else {
                        highlightTile(i, yTile, state);
                        break;
                    }
                }
                break;
            case 'N'://Knight
                highlightTile(xTile, yTile, state);
                selectedPiece = [xTile, yTile];
                for (let i = -2; i < 3; ++i) {
                    for (let j = -2; j < 3; ++j) {
                        if (Math.abs(i) + Math.abs(j) != 3) continue;
                        //check if not on canvas
                        if (yTile + j < 0 || xTile + i < 0 || yTile + j > 7 || xTile + i > 7) continue;
                        //check if on friendly piece
                        if (state[yTile + j][xTile + i] != null && state[yTile + j][xTile + i] == state[yTile + j][xTile + i].toUpperCase()) continue;
                        highlightTile(xTile + i,yTile + j , state);
                        
                    }
                }
                break;
            case 'B':
                highlightTile(xTile, yTile, state);
                selectedPiece = [xTile, yTile];
                //Handle moving up and left
                for (let i = yTile - 1, j = xTile - 1; i >= 0 && j >= 0; --i, --j) {
                    if (state[i][j] == null) {
                        highlightTile(j, i, state);
                    } else if (state[i][j] == state[i][j].toUpperCase()) {
                        break;
                    } else {
                        highlightTile(j, i, state);
                        break;
                    }
                }
                //Handle moving up and right
                for (let i = yTile - 1, j = xTile + 1; i >= 0 && j < 8; --i, ++j) {
                    if (state[i][j] == null) {
                        highlightTile(j, i, state);
                    } else if (state[i][j] == state[i][j].toUpperCase()) {
                        break;
                    } else {
                        highlightTile(j, i, state);
                        break;
                    }
                }
                //Handle moving down and left
                for (let i = yTile + 1, j = xTile - 1; i < 8 && j >= 0; ++i, --j) {
                    if (state[i][j] == null) {
                        highlightTile(j, i, state);
                    } else if (state[i][j] == state[i][j].toUpperCase()) {
                        break;
                    } else {
                        highlightTile(j, i, state);
                        break;
                    }
                }
                //Handle moving down and right
                for (let i = yTile + 1, j = xTile + 1; i < 8&& j < 8; ++i, ++j) {
                    if (state[i][j] == null) {
                        highlightTile(j, i, state);
                    } else if (state[i][j] == state[i][j].toUpperCase()) {
                        break;
                    } else {
                        highlightTile(j, i, state);
                        break;
                    }
                }

                break;
            case 'Q':
                highlightTile(xTile, yTile, state);
                selectedPiece = [xTile, yTile];
                //handle moving down
                for (let i = yTile + 1; i < 8; ++i) {
                    if (state[i][xTile] == null) {
                        highlightTile(xTile, i, state);
                    } else if (state[i][xTile].toUpperCase() == state[i][xTile]) {
                        break;
                    } else {
                        highlightTile(xTile, i, state);
                        break;
                    }
                }
                //handle moving up
                for (let i = yTile - 1; i >= 0; --i) {
                    if (state[i][xTile] == null) {
                        highlightTile(xTile, i, state);
                    } else if (state[i][xTile].toUpperCase() == state[i][xTile]) {
                        break;
                    } else {
                        highlightTile(xTile, i, state);
                        break;
                    }
                }
                //handle moving right
                for (let i = xTile + 1; i < 8; ++i) {
                    if (state[yTile][i] == null) {
                        highlightTile(i, yTile, state);
                    } else if (state[yTile][i].toUpperCase() == state[yTile][i]) {
                        break;
                    } else {
                        highlightTile(i, yTile, state);
                        break;
                    }
                }
                //handle moving left
                for (let i = xTile - 1; i >= 0; --i) {
                    if (state[yTile][i] == null) {
                        highlightTile(i, yTile, state);
                    } else if (state[yTile][i].toUpperCase() == state[yTile][i]) {
                        break;
                    } else {
                        highlightTile(i, yTile, state);
                        break;
                    }
                }

                highlightTile(xTile, yTile, state);
                //Handle moving up and left
                for (let i = yTile - 1, j = xTile - 1; i >= 0 && j >= 0; --i, --j) {
                    if (state[i][j] == null) {
                        highlightTile(j, i, state);
                    } else if (state[i][j] == state[i][j].toUpperCase()) {
                        break;
                    } else {
                        highlightTile(j, i, state);
                        break;
                    }
                }
                //Handle moving up and right
                for (let i = yTile - 1, j = xTile + 1; i >= 0 && j < 8; --i, ++j) {
                    if (state[i][j] == null) {
                        highlightTile(j, i, state);
                    } else if (state[i][j] == state[i][j].toUpperCase()) {
                        break;
                    } else {
                        highlightTile(j, i, state);
                        break;
                    }
                }
                //Handle moving down and left
                for (let i = yTile + 1, j = xTile - 1; i < 8 && j >= 0; ++i, --j) {
                    if (state[i][j] == null) {
                        highlightTile(j, i, state);
                    } else if (state[i][j] == state[i][j].toUpperCase()) {
                        break;
                    } else {
                        highlightTile(j, i, state);
                        break;
                    }
                }
                //Handle moving down and right
                for (let i = yTile + 1, j = xTile + 1; i < 8 && j < 8; ++i, ++j) {
                    if (state[i][j] == null) {
                        highlightTile(j, i, state);
                    } else if (state[i][j] == state[i][j].toUpperCase()) {
                        break;
                    } else {
                        highlightTile(j, i, state);
                        break;
                    }
                }
                break;
            case 'K':
                highlightTile(xTile, yTile, state);
                selectedPiece = [xTile, yTile];
                for (let i = -1; i < 2; ++i) {
                    for (let j = -1; j < 2; ++j) {
                        //check if not on canvas
                        if (yTile + j < 0 || xTile + i < 0 || yTile + j > 7 || xTile + i > 7) continue;
                        //check if on friendly piece
                        if (state[yTile + j][xTile + i] != null && state[yTile + j][xTile + i] == state[yTile + j][xTile + i].toUpperCase()) continue;
                        highlightTile(xTile + i, yTile + j, state);
                    } 
                }
                break;
            default:
                deHighlightTiles(highlitedTiles, state);
        }
    };

    const handleClick = (event: any) => {
        const rect = canvas.getBoundingClientRect();
        //get click tile
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const xTile = Math.floor(x / tileSize);
        const yTile = Math.floor(y / tileSize);
        //if clicked on highlighted piece de-select it else if clicked on highlighted tile
        //move last selected piece to it else select piece that was clicked on
        if (selectedPiece[0] == xTile && selectedPiece[1] == yTile) {
            deHighlightTiles(highlitedTiles, state);
        }else if (highlitedTiles.some(tile => tile[0] == xTile && tile[1] == yTile) ){
            console.log('yes');
            state[yTile][xTile] = state[selectedPiece[1]][selectedPiece[0]];
            state[selectedPiece[1]][selectedPiece[0]] = null;
            renderPiece(xTile, yTile, state);
            renderPiece(selectedPiece[0], selectedPiece[1], state);
            deHighlightTiles(highlitedTiles, state);
        } else {
            console.log('no');
            //highlight possible moves
            deHighlightTiles(highlitedTiles, state);
            highlightMoves(xTile, yTile, state);
        }
        console.log(state);
        console.log(highlitedTiles);
        console.log(selectedPiece);


       /* context.fillStyle = '#ff0000';
        context.fillRect(xTile * tileSize, yTile * tileSize, tileSize, tileSize);
       */ 
    };

    return (
        <>
            <p>chess</p>
            <canvas ref={canvasRef} height={tileSize * 8} width={tileSize * 8} onClick={ handleClick}>
                
            </canvas>
            <button onClick = {() => console.log(getNextMove())}> My eyes are burning</button>
        </>
    );
}