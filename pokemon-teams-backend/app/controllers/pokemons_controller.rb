class PokemonsController < ApplicationController
  def destroy
    Pokemon.find(params[:id]).destroy
  end
end
