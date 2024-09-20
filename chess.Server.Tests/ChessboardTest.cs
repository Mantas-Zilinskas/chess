using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using chess.Server.Services;
using chess.Server.Models;
using FluentAssertions;
using chess.Server.Models.ChessPieceModels;
using chess.Server.Enums;

namespace chess.Server.Tests
{
    public class ChessboardTest
    {
        [Fact]
        public void Chessboard_GetTileState_TileEnum()
        {
            var Chessboard = new Chessboard();


            Chessboard.State.Add(new PawnModel(1, 1, true));
            Chessboard.State.Add(new PawnModel(1, 2, false));


            var result1 = Chessboard.GetTileState(1, 1, true);
            var result2 = Chessboard.GetTileState(1, 2, true);
            var result3 = Chessboard.GetTileState(2, 1, true);
            var result4 = Chessboard.GetTileState(1, 1, false);
            var result5 = Chessboard.GetTileState(1, 2, false);
            var result6 = Chessboard.GetTileState(2, 1, false);

            result1.Should().Be(TileEnum.Friend);
            result2.Should().Be(TileEnum.Enemy);
            result3.Should().Be(TileEnum.Empty);
            result4.Should().Be(TileEnum.Enemy);
            result5.Should().Be(TileEnum.Friend);
            result6.Should().Be(TileEnum.Empty);

        }
    }
}
