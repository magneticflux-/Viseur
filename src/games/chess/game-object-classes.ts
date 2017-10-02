// Do not modify this file
// This is a simple lookup object for each GameObject class
import { IBaseGameObjectClasses } from "src/viseur/game/interfaces";
import { GameObject } from "./game-object";
import { Move } from "./move";
import { Piece } from "./piece";
import { Player } from "./player";

/** All the non Game classes in this game */
export const GameObjectClasses: Readonly<IBaseGameObjectClasses> = Object.freeze({
    Piece,
    Player,
    GameObject,
    Move,
}) as any;
