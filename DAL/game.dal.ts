import { prisma } from "../lib/prisma";
import DALReturn from "../interface/DALReturn";
import { gamesCreateInput, gamesUpdateInput } from "../generated/prisma/models";

const fetchGamesByUserId = async(id: string) => {
    try {
        const games = await prisma.games.findMany({where: {
            author: id,
            is_deleted: false
        }})
        return {
            status: true,
            data: games
        }
    }
    catch (error){
        console.log(error);
        return {
            status: false
        }
    }
}

const fetchGames = async(id: string) => {
    try {
        const games = await prisma.games.findMany({where: {
            is_deleted: false
        }})
        return {
            status: true,
            data: games
        }
    }
    catch (error){
        console.log(error);
        return {
            status: false
        }
    }
}

const fetchGameById = async(id: string) => {
    try {
        const game = await prisma.games.findUnique({where: {
            game_id: id,
            is_deleted: false
        }})
        return {
            status: true,
            data: game
        }
    }
    catch (error){
        console.log(error);
        return {
            status: false
        }
    }
}

const createGame = async(game: gamesCreateInput): Promise<DALReturn> => {
    try {
        const createdGame = await prisma.games.create({data: game});
        return {
            status: true,
            data: createdGame
        }
    }
    catch(error){
        console.log(error);
        return {
            status: false
        }
    }
}

const updateGame = async(id: string, gameUpdate: gamesUpdateInput) : Promise<DALReturn> => {
    try{
        const updatedGame = await prisma.games.update({
            where: {game_id: id},
            data: gameUpdate
        });
        return {
            status: true,
            data: updatedGame,
        };
    }
    catch(error){
        console.log(error);
        return {
            status: false,
        };
    }
}

const deleteGame = async(id: string, gameUpdate: gamesUpdateInput) : Promise<DALReturn> => {
    try{
        const updatedGame = await prisma.games.update({
            where: {game_id: id},
            data: {
                is_deleted: true
            }
        });
        return {
            status: true,
        };
    }
    catch(error){
        console.log(error);
        return {
            status: false,
        };
    }
}