using chess.Server.Models;
using System.Collections;

namespace chess.Server.Services
{
    public class ChessMoveService
    {
        public Chessboard GetNextMove(Chessboard state){


            return null;
        }

        public Chessboard Simulate(Chessboard state) {


            return null;
        }

        /*public int GetScore(Chessboard state) {
            int score = 0;

            for (int y = 0; y < 8; ++y)
            {
                for (int x = 0; x < 8; ++x)
                {
                    if (state.State[y][x].HasValue && state.State[y][x] > 96)
                    {
                        switch
                    }
                }
            }

            return score;
        }*/

        //extract a list of piece coordinates
       /* public List<(int, int)> GetPieces(Chessboard state) {
            List<(int, int)> pieces = new List<(int, int)>();
            for (int y = 0; y < 8; ++y) {
                for (int x = 0; x < 8; ++x) {
                    if (state.State[y][x].HasValue && state.State[y][x] > 96) {
                        pieces.Add((x, y));
                    }
                }
            }
            Console.WriteLine(pieces);
            return pieces;
        }*/

        //get potential moves coordinates
       /*public List <(int, int)> GetPieceMoves(Chessboard state, (int, int) piece) {
            List<(int, int)> moves = new List<(int, int)>();

            switch (state.State[piece.Item2][piece.Item1]) {
                case 'p':
                    //handle move
                    if (state.State[piece.Item2 + 1][piece.Item1] == null)
                    {
                        moves.Add((piece.Item1, piece.Item2 + 1));

                        if (piece.Item2 == 1 && state.State[piece.Item2 + 2][piece.Item1] == null) 
                        {
                            moves.Add((piece.Item1, piece.Item2 + 2));
                        }
                    }
                    //handle attacking
                    if (piece.Item1 != 7 &&
                        state.State[piece.Item2 + 1][piece.Item1 + 1] != null && 
                        state.State[piece.Item2 + 1][piece.Item1 + 1] < 90) 
                    {
                        moves.Add((piece.Item1 + 1,piece.Item2 + 1));
                    }

                    if (piece.Item1 != 0 &&
                        state.State[piece.Item2 + 1][piece.Item1 - 1] != null &&
                        state.State[piece.Item2 + 1][piece.Item1 - 1] < 90)
                    {
                        moves.Add((piece.Item1 - 1, piece.Item2 + 1));
                    }
                    break;
                case 'P':
                    //handle move
                    if (state.State[piece.Item2 - 1][piece.Item1] == null)
                    {
                        moves.Add((piece.Item1, piece.Item2 - 1));

                        if (piece.Item2 == 6 && state.State[piece.Item2 - 2][piece.Item1] == null)
                        {
                            moves.Add((piece.Item1, piece.Item2 - 2));
                        }
                    }
                    //handle attacking
                    if (piece.Item1 != 7 &&
                        state.State[piece.Item2 - 1][piece.Item1 - 1] != null &&
                        state.State[piece.Item2 - 1][piece.Item1 - 1] < 90)
                    {
                        moves.Add((piece.Item1 - 1, piece.Item2 - 1));
                    }

                    if (piece.Item1 != 0 &&
                        state.State[piece.Item2 - 1][piece.Item1 + 1] != null &&
                        state.State[piece.Item2 - 1][piece.Item1 + 1] < 90)
                    {
                        moves.Add((piece.Item1 - 1, piece.Item2 + 1));
                    }
                    break;
                case 'r':

                    break;
                default:
                    break;            
            }
            return moves;
        }*/
    }
}
