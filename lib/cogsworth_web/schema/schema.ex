defmodule CogsworthWeb.Schema.Schema do
  use Absinthe.Schema

  # TODO: add descriptions
  query do
    @desc "Get a list of settings"
    field :settings, list_of(:food_setting) do
      resolve &CogsworthWeb.Resolvers.PetFeeder.settings/3
    end
    field :current_weight_a, non_null(:integer) do
      resolve &CogsworthWeb.Resolvers.PetFeeder.current_weight_a/2
    end
    field :current_weight_b, non_null(:integer) do
      resolve &CogsworthWeb.Resolvers.PetFeeder.current_weight_b/2
    end
  end

  object :food_setting do
    field :name, non_null(:string)
    field :weight_to_fill_a, non_null(:integer)
    field :weight_to_fill_b, non_null(:integer)
    field :fill_strategy, non_null(:string)
    field :fill_schedule, non_null(:string)
  end
end
