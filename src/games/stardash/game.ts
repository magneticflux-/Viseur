// This is a class to represent the Game object in the game.
// If you want to render it in the game do so here.
import { Delta } from "@cadre/ts-utils/cadre";
import * as Color from "color";
import { Immutable } from "src/utils";
import { BaseGame } from "src/viseur/game";
import { IRendererSize } from "src/viseur/renderer";
import { GameObjectClasses } from "./game-object-classes";
import { HumanPlayer } from "./human-player";
import { GameResources } from "./resources";
import { GameSettings } from "./settings";
import { IGameState } from "./state-interfaces";
//import { Container } from 'pixi.js';

// <<-- Creer-Merge: imports -->>
// any additional imports you want can be added here safely between Creer runs
// <<-- /Creer-Merge: imports -->>

/**
 * An object in the game. The most basic class that all game classes should inherit from automatically.
 */
export class Game extends BaseGame {
    // <<-- Creer-Merge: static-functions -->>
    // you can add static functions here
    // <<-- /Creer-Merge: static-functions -->>

    /** The static name of this game. */
    public static readonly gameName = "Stardash";

    /** The number of players in this game. the players array should be this same size */
    public static readonly numberOfPlayers = 2;

    /** The current state of the Game (dt = 0) */
    public current: IGameState | undefined;

    /** The next state of the Game (dt = 1) */
    public next: IGameState | undefined;

    /** The resource factories that can create sprites for this game */
    public readonly resources = GameResources;

    /** The human player playing this game */
    public readonly humanPlayer: HumanPlayer | undefined;

    /** The default player colors for this game, there must be one for each player */
    public readonly defaultPlayerColors: [Color, Color] = [
        // <<-- Creer-Merge: default-player-colors -->>
        this.defaultPlayerColors[0], // Player 0
        this.defaultPlayerColors[1], // Player 1
        // <<-- /Creer-Merge: default-player-colors -->>
    ];

    /** The custom settings for this game */
    public readonly settings = this.createSettings(GameSettings);

    /** The layers in the game */
    public readonly layers = this.createLayers({
        // <<-- Creer-Merge: layers -->>
        /** Bottom most layer, for background elements */
        background: this.createLayer(),
        /** Middle layer, for moving game objects */
        game: this.createLayer(),
        /** Top layer, for UI elements above the game */
        ui: this.createLayer(),
        // <<-- /Creer-Merge: layers -->>
    });

    /** Mapping of the class names to their class for all sub game object classes */
    public readonly gameObjectClasses = GameObjectClasses;

    // <<-- Creer-Merge: variables -->>
    // You can add additional member variables here
    // <<-- /Creer-Merge: variables -->>

    // <<-- Creer-Merge: public-functions -->>
    // You can add additional public functions here
    // <<-- /Creer-Merge: public-functions -->>

    /**
     * Invoked when the first game state is ready to setup the size of the renderer.
     *
     * @param state - The initialize state of the game.
     * @returns The {height, width} you for the game's size.
     */
    protected getSize(state: IGameState): IRendererSize {
        return {
            // <<-- Creer-Merge: get-size -->>
            width: state.sizeX, // Change these. Probably read in the map's width
            height: state.sizeY, // and height from the initial state here.
            // <<-- /Creer-Merge: get-size -->>
        };
    }

    /**
     * Called when Viseur is ready and wants to start rendering the game.
     * This is where you should initialize your state variables that rely on game data.
     *
     * @param state - The initialize state of the game.
     */
    protected start(state: IGameState): void {
        super.start(state);

        // <<-- Creer-Merge: start -->>
        // Initialize your variables here
        // <<-- /Creer-Merge: start -->>
    }

    /**
     * Initializes the background. It is drawn once automatically after this step.
     *
     * @param state - The initial state to use the render the background.
     */
    protected createBackground(state: IGameState): void {
        super.createBackground(state);

        // <<-- Creer-Merge: create-background -->>
        // Initialize your background here if need be
        
        // this shows you how to render text that scales to the game
        // NOTE: height of 1 means 1 "unit", so probably 1 tile in height
        
        // this.resources.background.newSprite({
        //     container: this.layers.background,
        //     width: this.renderer.width,
        //     height: this.renderer.height,
        // });

        // this.resources.sun.newSprite({
        //     container: this.layers.background,
        //     width: (state.bodies[2].radius * 2),
        //     height: (state.bodies[2].radius * 1.5),
        //     position: {x: state.bodies[2].x - 450, y: state.bodies[2].y - 270},
         
        // });

        // this.resources.earth_planet.newSprite({
        //     container: this.layers.background,
        //     width: (state.bodies[0].radius * 2),
        //     height: (state.bodies[0].radius * 1.5),
        //     position: {x: state.bodies[0].x-175 , y: state.bodies[0].y - 85}
        // });

        // this.resources.alien_planet.newSprite({
        //     container: this.layers.background,
        //     width: (state.bodies[1].radius * 2),
        //     height: (state.bodies[1].radius * 1.5),
        //     position: {x: state.bodies[1].x - 175, y: state.bodies[1].y - 85}
        // });

        // <<-- /Creer-Merge: create-background -->>
    }

    /**
     * Called approx 60 times a second to update and render the background.
     * Leave empty if the background is static.
     *
     * @param dt - A floating point number [0, 1) which represents how far into the next turn to render at.
     * @param current - The current (most) game state, will be this.next if this.current is undefined.
     * @param next - The next (most) game state, will be this.current if this.next is undefined.
     * @param delta - The current (most) delta, which explains what happened.
     * @param nextDelta  - The the next (most) delta, which explains what happend.
     */
    protected renderBackground(
        dt: number,
        current: Immutable<IGameState>,
        next: Immutable<IGameState>,
        delta: Immutable<Delta>,
        nextDelta: Immutable<Delta>,
    ): void {
        super.renderBackground(dt, current, next, delta, nextDelta);

        this.resources.background.newSprite({
            container: this.layers.background,
            width: this.renderer.width,
            height: this.renderer.height,
        });

        this.resources.sun.newSprite({
            container: this.layers.background,
            width: (current.bodies[2].radius * 2),
            height: (current.bodies[2].radius * 1.5),
            position: {x: current.bodies[2].x - 450, y: current.bodies[2].y - 270},
         
        });

        this.resources.earth_planet.newSprite({
            container: this.layers.background,
            width: (current.bodies[0].radius * 2),
            height: (current.bodies[0].radius * 1.5),
            position: {x: current.bodies[0].x-175 , y: current.bodies[0].y - 85}
        });

        this.resources.alien_planet.newSprite({
            container: this.layers.background,
            width: (current.bodies[1].radius * 2),
            height: (current.bodies[1].radius * 1.5),
            position: {x: current.bodies[1].x - 175, y: current.bodies[1].y - 85}
        });

        for (let i in current.bodies){
            if(current.bodies[i].materialType == "genarium"){
                this.resources.genarium.newSprite({
                    container: this.layers.background,
                    width: (current.bodies[i].radius),
                    height: (current.bodies[i].radius),
                    position: {x: current.bodies[i].x, y: current.bodies[i].y}
                });
            }
            if(current.bodies[i].materialType == "rarium"){
                this.resources.rarium.newSprite({
                    container: this.layers.background,
                    width: (current.bodies[i].radius),
                    height: (current.bodies[i].radius),
                    position: {x: current.bodies[i].x, y: current.bodies[i].y}
                });
            }
            if(current.bodies[i].materialType == "legendarium"){
                this.resources.legendarium.newSprite({
                    container: this.layers.background,
                    width: (current.bodies[i].radius),
                    height: (current.bodies[i].radius),
                    position: {x: current.bodies[i].x, y: current.bodies[i].y}
                });
            }
            if(current.bodies[i].materialType == "mythicite"){
                this.resources.mythicite.newSprite({
                    container: this.layers.background,
                    width: (current.bodies[i].radius),
                    height: (current.bodies[i].radius),
                    position: {x: current.bodies[i].x, y: current.bodies[i].y}
                });
            }
            
        }

        // <<-- Creer-Merge: render-background -->>
        // update and re-render whatever you initialize in renderBackground
        // <<-- /Creer-Merge: render-background -->>
    }

    /**
     * Invoked when the game state updates.
     *
     * @param current - The current (most) game state, will be this.next if this.current is undefined.
     * @param next - The next (most) game state, will be this.current if this.next is undefined.
     * @param delta - The current (most) delta, which explains what happened.
     * @param nextDelta  - The the next (most) delta, which explains what happend.
     */
    protected stateUpdated(
        current: Immutable<IGameState>,
        next: Immutable<IGameState>,
        delta: Immutable<Delta>,
        nextDelta: Immutable<Delta>,
    ): void {
        super.stateUpdated(current, next, delta, nextDelta);

        // <<-- Creer-Merge: state-updated -->>
        // update the Game based on its current and next states
        // <<-- /Creer-Merge: state-updated -->>
    }
    // <<-- Creer-Merge: protected-private-functions -->>
    // You can add additional protected/private functions here
    // <<-- /Creer-Merge: protected-private-functions -->>
}
