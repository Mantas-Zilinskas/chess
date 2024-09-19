using chess.Server.Models.ChessPieceModels;
using chess.Server.Enums;

namespace chess.Server.Models
{
    public class Chessboard
    {
        public List<ChessPieceModel> State { get; set; }
        public int Difficulty { get; set; }

        public TileEnum GetTileState(int x, int y, bool IsWhite) {
            var result = State.SingleOrDefault((p) => (p.X == x && p.Y == y));

            if (result == null)
            {
                return TileEnum.Empty;
            }
            else if (result.IsWhite == IsWhite)
            {
                return TileEnum.Friend;
            }
            else
            {
                return TileEnum.Enemy;
            }
        }
    }
}
