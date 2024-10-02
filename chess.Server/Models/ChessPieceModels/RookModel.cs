
namespace chess.Server.Models.ChessPieceModels
{
    public class RookModel : ChessPieceModel
    {
        public RookModel(int x, int y, bool isWhite) : base(x, y, isWhite)
        {
        }

        public override List<(int, int)> GetMoves(Chessboard state)
        {
            List<(int, int)> moves = new List<(int, int)>();

            for (int x = X; x < 8; ++x) {
                if (state.GetTileState(x, Y, IsWhite) == Enums.TileEnum.Empty)
                {
                    moves.Add((x, Y));
                }
                else if (state.GetTileState(x, Y, IsWhite) == Enums.TileEnum.Enemy)
                {
                    moves.Add((x, Y));
                    break;
                }
                else 
                {
                    break;
                }
            }
            for (int x = X; x > 0; --x)
            {
                if (state.GetTileState(x, Y, IsWhite) == Enums.TileEnum.Empty)
                {
                    moves.Add((x, Y));
                }
                else if (state.GetTileState(x, Y, IsWhite) == Enums.TileEnum.Enemy)
                {
                    moves.Add((x, Y));
                    break;
                }
                else
                {
                    break;
                }
            }

            for (int y = Y; y < 8; ++y)
            {
                if (state.GetTileState(X, y, IsWhite) == Enums.TileEnum.Empty)
                {
                    moves.Add((X, y));
                }
                else if (state.GetTileState(X, y, IsWhite) == Enums.TileEnum.Enemy)
                {
                    moves.Add((X, y));
                    break;
                }
                else
                {
                    break;
                }
            }

            for (int y = Y; y > 0; --y)
            {
                if (state.GetTileState(X, y, IsWhite) == Enums.TileEnum.Empty)
                {
                    moves.Add((X, y));
                }
                else if (state.GetTileState(X, y, IsWhite) == Enums.TileEnum.Enemy)
                {
                    moves.Add((X, y));
                    break;
                }
                else
                {
                    break;
                }
            }

            return moves;
        }
    }
}
