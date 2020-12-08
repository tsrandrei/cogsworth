#temp
defmodule CogsworthWeb.Resolvers.PetFeeder do
  def settings(_, _, _) do
    {:ok, [
      %{
        name: "Food",
        weight_to_fill_a: 80,
        weight_to_fill_b: 80,
        fill_strategy: :once_a_day,
        fill_schedule: "7:30"
      },
      %{
        name: "Treats",
        weight_to_fill_a: 80,
        weight_to_fill_b: 80,
        fill_strategy: :once_a_day,
        fill_schedule: "7:30"
      }
    ]}
  end

  def current_weight_a(_,_), do: {:ok, 0}
  def current_weight_b(_,_), do: {:ok, 0}
end
