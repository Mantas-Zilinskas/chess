namespace chess.Server.Models.ChessPieceModels
{
    public abstract class ChessPieceModel
    {
        public bool IsWhite { get; set; }
        public int X { get; set; }
        public int Y { get; set; }
        public abstract List<(int, int)> GetMoves(Chessboard state);

        protected ChessPieceModel(bool white, int x, int y) {
            IsWhite = white;
            X = x;
            Y = y;
        }
    }
}
