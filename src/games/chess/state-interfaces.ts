// These are the interfaces for all the states in this game
import { IBaseGameObjectState, IBaseGameState, IBasePlayerState } from "src/viseur/game";

// This is a file generated by the Creer, it may have empty interfaces,
// but we need them, so let's disable that tslint rule
// tslint:disable:no-empty-interface

/**
 * The traditional 8x8 chess board with pieces.
 */
export interface IGameState extends IBaseGameState {
    /**
     * The player whose turn it is currently. That player can send commands.
     * Other players cannot.
     */
    currentPlayer: IPlayerState;

    /**
     * The current turn number, starting at 0 for the first player's turn.
     */
    currentTurn: number;

    /**
     * Forsyth–Edwards Notation, a notation that describes the game board.
     */
    fen: string;

    /**
     * A mapping of every game object's ID to the actual game object. Primarily
     * used by the server and client to easily refer to the game objects via ID.
     */
    gameObjects: {[id: string]: IGameObjectState};

    /**
     * The maximum number of turns before the game will automatically end.
     */
    maxTurns: number;

    /**
     * The list of Moves that have occurred, in order.
     */
    moves: IMoveState[];

    /**
     * All the uncaptured Pieces in the game.
     */
    pieces: IPieceState[];

    /**
     * List of all the players in the game.
     */
    players: IPlayerState[];

    /**
     * A unique identifier for the game instance that is being played.
     */
    session: string;

    /**
     * How many turns until the game ends because no pawn has moved and no Piece
     * has been taken.
     */
    turnsToDraw: number;

}

/**
 * An object in the game. The most basic class that all game classes should
 * inherit from automatically.
 */
export interface IGameObjectState extends IBaseGameObjectState {
    /**
     * String representing the top level Class that this game object is an
     * instance of. Used for reflection to create new instances on clients, but
     * exposed for convenience should AIs want this data.
     */
    gameObjectName: string;

    /**
     * A unique id for each instance of a GameObject or a sub class. Used for
     * client and server communication. Should never change value after being
     * set.
     */
    id: string;

    /**
     * Any strings logged will be stored here. Intended for debugging.
     */
    logs: string[];

}

/**
 * Contains all details about a Piece's move in the game.
 */
export interface IMoveState extends IGameObjectState {
    /**
     * The Piece captured by this Move, null if no capture.
     */
    captured: IPieceState;

    /**
     * The file the Piece moved from.
     */
    fromFile: string;

    /**
     * The rank the Piece moved from.
     */
    fromRank: number;

    /**
     * The Piece that was moved.
     */
    piece: IPieceState;

    /**
     * The Piece type this Move's Piece was promoted to from a Pawn, empty
     * string if no promotion occurred.
     */
    promotion: string;

    /**
     * The standard algebraic notation (SAN) representation of the move.
     */
    san: string;

    /**
     * The file the Piece moved to.
     */
    toFile: string;

    /**
     * The rank the Piece moved to.
     */
    toRank: number;

}

/**
 * A chess piece.
 */
export interface IPieceState extends IGameObjectState {
    /**
     * When the Piece has been captured (removed from the board) this is true.
     * Otherwise false.
     */
    captured: boolean;

    /**
     * The file (column) coordinate of the Piece represented as a letter [a-h],
     * with 'a' starting at the left of the board.
     */
    file: string;

    /**
     * If the Piece has moved from its starting position.
     */
    hasMoved: boolean;

    /**
     * The player that controls this chess Piece.
     */
    owner: IPlayerState;

    /**
     * The rank (row) coordinate of the Piece represented as a number [1-8],
     * with 1 starting at the bottom of the board.
     */
    rank: number;

    /**
     * The type of chess Piece this is, either 'King, 'Queen', 'Knight', 'Rook',
     * 'Bishop', or 'Pawn'.
     */
    type: string;

}

/**
 * A player in this game. Every AI controls one player.
 */
export interface IPlayerState extends IGameObjectState, IBasePlayerState {
    /**
     * What type of client this is, e.g. 'Python', 'JavaScript', or some other
     * language. For potential data mining purposes.
     */
    clientType: string;

    /**
     * The color (side) of this player. Either 'White' or 'Black', with the
     * 'White' player having the first move.
     */
    color: string;

    /**
     * True if this player is currently in check, and must move out of check,
     * false otherwise.
     */
    inCheck: boolean;

    /**
     * If the player lost the game or not.
     */
    lost: boolean;

    /**
     * If the Player has made their move for the turn. true means they can no
     * longer move a Piece this turn.
     */
    madeMove: boolean;

    /**
     * The name of the player.
     */
    name: string;

    /**
     * This player's opponent in the game.
     */
    opponent: IPlayerState;

    /**
     * All the uncaptured chess Pieces owned by this player.
     */
    pieces: IPieceState[];

    /**
     * The direction your Pieces must go along the rank axis until they reach
     * the other side. Will be +1 if the Player is 'White', or -1 if the Player
     * is 'Black'.
     */
    rankDirection: number;

    /**
     * The reason why the player lost the game.
     */
    reasonLost: string;

    /**
     * The reason why the player won the game.
     */
    reasonWon: string;

    /**
     * The amount of time (in ns) remaining for this AI to send commands.
     */
    timeRemaining: number;

    /**
     * If the player won the game or not.
     */
    won: boolean;

}
