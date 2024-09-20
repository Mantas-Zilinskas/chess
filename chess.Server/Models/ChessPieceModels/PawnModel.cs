using chess.Server.Enums;

namespace chess.Server.Models.ChessPieceModels
{
    public class PawnModel : ChessPieceModel
    {
        public PawnModel(int x, int y, bool white) :base(x, y, white) { }
        public override List<(int, int)> GetMoves(Chessboard state) {

            List<(int,int)> moves = new List<(int, int)> ();

            if (!IsWhite)
            {
                if (state.GetTileState(X, Y + 1, IsWhite) == TileEnum.Empty)
                {
                    moves.Add((X, Y + 1));
                    if (state.GetTileState(X, Y + 2, IsWhite) == TileEnum.Empty && Y == 1)
                    {
                        moves.Add((X, Y + 2));
                    }
                }

                if (state.GetTileState(X - 1, Y + 1, IsWhite) == TileEnum.Enemy && X > 0) 
                {
                    moves.Add((X - 1, Y + 1));
                }

                if (state.GetTileState(X + 1, Y + 1, IsWhite) == TileEnum.Enemy && X < 7)
                {
                    moves.Add((X + 1, Y + 1));
                }

            }
            else 
            {
                if (state.GetTileState(X, Y - 1, IsWhite) == TileEnum.Empty)
                {
                    moves.Add((X, Y - 1));
                    if (state.GetTileState(X, Y - 2, IsWhite) == TileEnum.Empty && Y == 6)
                    {
                        moves.Add((X, Y - 2));
                    }
                }

                if (state.GetTileState(X - 1, Y - 1, IsWhite) == TileEnum.Enemy && X > 0)
                {
                    moves.Add((X - 1, Y - 1));
                }

                if (state.GetTileState(X + 1, Y - 1, IsWhite) == TileEnum.Enemy && X < 7)
                {
                    moves.Add((X + 1, Y - 1));
                }

            }


            return moves;
        }
    }
}
