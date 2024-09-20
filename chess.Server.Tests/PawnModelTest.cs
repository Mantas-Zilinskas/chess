using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using chess.Server.Services;
using chess.Server.Models;
using FluentAssertions;
using chess.Server.Enums;
using chess.Server.Models.ChessPieceModels;

namespace chess.Server.Tests
{
    public class PawnModelTest
    {
        [Fact]
        public void PawnModel_GetMoves_ListToupleIntInt()
        {
            var Chessboard = new Chessboard();


            Chessboard.State.Add(new PawnModel(x: 0, y: 1, false));//0

            Chessboard.State.Add(new PawnModel(x: 1, y: 1, false));//1
            Chessboard.State.Add(new PawnModel(x: 1, y: 3, false));//2

            Chessboard.State.Add(new PawnModel(x: 2, y: 1, false));//3
            Chessboard.State.Add(new PawnModel(x: 2, y: 2, false));//4
            Chessboard.State.Add(new PawnModel(x: 3, y: 3, true));//5

            Chessboard.State.Add(new PawnModel(x: 5, y: 1, false));//6
            Chessboard.State.Add(new PawnModel(x: 6, y: 2, true));//7
            Chessboard.State.Add(new PawnModel(x: 4, y: 2, true));//8

            Chessboard.State.Add(new PawnModel(x: 7, y: 2, false));//9
            
            Chessboard.State.Add(new PawnModel(x: 0, y: 6, true));//10


            var result1 = Chessboard.State[0].GetMoves(Chessboard);
            var result2 = Chessboard.State[1].GetMoves(Chessboard);
            var result3 = Chessboard.State[3].GetMoves(Chessboard);
            var result4 = Chessboard.State[2].GetMoves(Chessboard);
            var result5 = Chessboard.State[4].GetMoves(Chessboard);
            var result6 = Chessboard.State[5].GetMoves(Chessboard);
            var result7 = Chessboard.State[6].GetMoves(Chessboard);
            var result8 = Chessboard.State[9].GetMoves(Chessboard);

            //black tests
            result1.Should().BeEquivalentTo(new[] {(0,2), (0,3)}); //can move 2 squares on first move on board edge
            result2.Should().BeEquivalentTo(new[] { (1, 2) }); //can 2nd square of first move be blocked
            result3.Should().BeEmpty();//can move be blocked entirely
            result4.Should().BeEquivalentTo(new[] {(1, 4)});//can move 1 square when not first move
            result5.Should().BeEquivalentTo(new[] {(2, 3), (3,3)});//can attack one
            result7.Should().BeEquivalentTo(new[] { (5, 2), (5, 3), (6, 2), (4, 2) });//can attack two
            result8.Should().BeEquivalentTo(new[] {(7,3)});//can move on right board edge

        }
    }
}
