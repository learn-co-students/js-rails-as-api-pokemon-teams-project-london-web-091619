class PokemonsController < ApplicationController
    def destroy
        pokemon = Pokemon.find_by(id: params[:id])
        if pokemon
            render json: pokemon, only: [:id, :nickname, :species, :trainer_id]
        pokemon.destroy
        else
            render json: {message: "This pokemon does not exist!?!"}
        end
    end


    def create
        name = Faker::Name.first_name
        species = Faker::Games::Pokemon.name
        pokemon= Pokemon.create(nickname: name, species: species, trainer_id: params[:id])
        if pokemon
            render json: pokemon, only: [:id, :nickname, :species]
        else
            render json: {message: "The pokemon was not created"}
        end
    end
end
