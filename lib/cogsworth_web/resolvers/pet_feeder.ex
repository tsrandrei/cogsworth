#temp
defmodule CogsworthWeb.Resolvers.PetFeeder do
  def settings(_, _, _) do
    {:ok, [
      %{
        name: "Food",
        weight_to_fill_a: 80,
        weight_to_fill_b: 70,
        fill_strategy: :up_to_amount,
        fill_schedule: "07:30"
      },
      %{
        name: "Treats",
        weight_to_fill_a: 20,
        weight_to_fill_b: 10,
        fill_strategy: :once_a_day,
        fill_schedule: "09:30"
      }
    ]}
  end

  def current_weight_a(_,_), do: {:ok, 0}
  def current_weight_b(_,_), do: {:ok, 0}
end
