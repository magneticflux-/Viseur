// These are the interfaces for all the states in this game
import { IBaseGame, IBaseGameObject, IBasePlayer } from "@cadre/ts-utils/cadre";

// This is a file generated by the Creer, it may have empty interfaces,
// but we need them, so let's disable that tslint rule
// tslint:disable:no-empty-interface

/**
 * Collect of the most of the rarest mineral orbiting aroung the sun and
 * outcompete your competetor.
 */
export interface IGameState extends IBaseGame {
    /**
     * All the celestial bodies in the game.
     */
    bodies: IBodyState[];

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
     * The distance traveled each turn by dashing.
     */
    dashDistance: number;

    /**
     * A mapping of every game object's ID to the actual game object. Primarily
     * used by the server and client to easily refer to the game objects via ID.
     */
    gameObjects: {[id: string]: IGameObjectState};

    /**
     * A list of all jobs. first item is corvette, second is missleboat, third
     * is martyr, fourth is transport, and fifth is miner.
     */
    jobs: IJobState[];

    /**
     * The highest amount of material, barring rarity, that can be in a
     * asteroid.
     */
    maxAsteroid: number;

    /**
     * The maximum number of turns before the game will automatically end.
     */
    maxTurns: number;

    /**
     * The smallest amount of material, barring rarity, that can be in a
     * asteroid.
     */
    minAsteroid: number;

    /**
     * The rate at which miners grab minerals from asteroids.
     */
    miningSpeed: number;

    /**
     * The rarity modifier of the most common ore. This controls how much
     * spawns.
     */
    oreRarity1: number;

    /**
     * The rarity modifier of the second rarest ore. This controls how much
     * spawns.
     */
    oreRarity2: number;

    /**
     * The rarity modifier of the rarest ore. This controls how much spawns.
     */
    oreRarity3: number;

    /**
     * The amount of energy the planets restore each round.
     */
    planetRechargeRate: number;

    /**
     * List of all the players in the game.
     */
    players: IPlayerState[];

    /**
     * The amount of distance missiles travel through space.
     */
    projectileSpeed: number;

    /**
     * Every projectile in the game.
     */
    projectiles: IProjectileState[];

    /**
     * The regeneration rate of asteroids.
     */
    regenerateRate: number;

    /**
     * A unique identifier for the game instance that is being played.
     */
    session: string;

    /**
     * The size of the map in the X direction.
     */
    sizeX: number;

    /**
     * The size of the map in the Y direction.
     */
    sizeY: number;

    /**
     * The amount of time (in nano-seconds) added after each player performs a
     * turn.
     */
    timeAddedPerTurn: number;

    /**
     * Every Unit in the game.
     */
    units: IUnitState[];

}

/**
 * A celestial body located within the game.
 */
export interface IBodyState extends IGameObjectState {
    /**
     * The amount of material the object has.
     */
    amount: number;

    /**
     * The type of celestial body it is.
     */
    bodyType: string;

    /**
     * The type of material the celestial body has.
     */
    materialType: string;

    /**
     * The radius of the circle that this body takes up.
     */
    radius: number;

    /**
     * The x value this celestial body is on.
     */
    x: number;

    /**
     * The y value this celestial body is on.
     */
    y: number;

}

/**
 * An object in the game. The most basic class that all game classes should
 * inherit from automatically.
 */
export interface IGameObjectState extends IBaseGameObject {
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
 * Information about a unit's job.
 */
export interface IJobState extends IGameObjectState {
    /**
     * How many combined resources a unit with this Job can hold at once.
     */
    carryLimit: number;

    /**
     * The amount of damage this Job does per attack.
     */
    damage: number;

    /**
     * The amount of starting health this Job has.
     */
    energy: number;

    /**
     * The distance this job can move per turn.
     */
    moves: number;

    /**
     * The reserve the martyr use to protect allies.
     */
    shield: number;

    /**
     * The Job title. 'corvette', 'missleboat', 'martyr', 'transport', or
     * 'miner'. (in this order from 0-4).
     */
    title: string;

    /**
     * How much money it costs to spawn a unit.
     */
    unitCost: number;

}

/**
 * A player in this game. Every AI controls one player.
 */
export interface IPlayerState extends IGameObjectState, IBasePlayer {
    /**
     * What type of client this is, e.g. 'Python', 'JavaScript', or some other
     * language. For potential data mining purposes.
     */
    clientType: string;

    /**
     * The home base of the player.
     */
    homeBase: IBodyState;

    /**
     * If the player lost the game or not.
     */
    lost: boolean;

    /**
     * The amount of money this Player has.
     */
    money: number;

    /**
     * The name of the player.
     */
    name: string;

    /**
     * This player's opponent in the game.
     */
    opponent: IPlayerState;

    /**
     * Every Projectile owned by this Player.
     */
    projectiles: IProjectileState[];

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
     * Every Unit owned by this Player.
     */
    units: IUnitState[];

    /**
     * The number of victory points the player has.
     */
    victoryPoints: number;

    /**
     * If the player won the game or not.
     */
    won: boolean;

}

/**
 * Tracks any projectiles moving through space.
 */
export interface IProjectileState extends IGameObjectState {
    /**
     * The Player that owns and can control this Unit.
     */
    owner: IPlayerState;

    /**
     * The radius of the circle this projectile occupies.
     */
    radius: number;

    /**
     * The unit that is being attacked by this projectile.
     */
    target: IUnitState;

    /**
     * The x value this projectile is on.
     */
    x: number;

    /**
     * The y value this projectile is on.
     */
    y: number;

}

/**
 * A unit in the game. May be a corvette, missleboat, martyr, transport, miner.
 */
export interface IUnitState extends IGameObjectState {
    /**
     * Whether or not this Unit has performed its action this turn.
     */
    acted: boolean;

    /**
     * The remaining health of a unit.
     */
    energy: number;

    /**
     * The amount of Generium ore carried by this unit. (0 to job carry capacity
     * - other carried items).
     */
    genarium: number;

    /**
     * Tracks wheither or not the ship is dashing.
     */
    isDashing: boolean;

    /**
     * The Job this Unit has.
     */
    job: IJobState;

    /**
     * The amount of Legendarium ore carried by this unit. (0 to job carry
     * capacity - other carried items).
     */
    legendarium: number;

    /**
     * The distance this unit can still move.
     */
    moves: number;

    /**
     * The amount of Mythicite carried by this unit. (0 to job carry capacity -
     * other carried items).
     */
    mythicite: number;

    /**
     * The Player that owns and can control this Unit.
     */
    owner: IPlayerState;

    /**
     * The radius of the circle this unit occupies.
     */
    radius: number;

    /**
     * The amount of Rarium carried by this unit. (0 to job carry capacity -
     * other carried items).
     */
    rarium: number;

    /**
     * The x value this unit is on.
     */
    x: number;

    /**
     * The y value this unit is on.
     */
    y: number;

}
