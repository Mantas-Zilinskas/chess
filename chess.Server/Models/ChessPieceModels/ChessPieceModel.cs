namespace chess.Server.Models.ChessPieceModels
{
    public abstract class ChessPieceModel : ICloneable
    {
        public bool IsWhite { get; set; }
        public int X { get; set; }
        public int Y { get; set; }
        public abstract List<(int, int)> GetMoves(Chessboard state);
        public abstract object Clone()
        protected ChessPieceModel(int x, int y, bool isWhite) {
            IsWhite = isWhite;
            X = x;
            Y = y;
        }
    }
}
