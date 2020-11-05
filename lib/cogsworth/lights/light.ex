defmodule Cogsworth.Lights.Light do
  @enforce_keys [:id, :name]
  defstruct [:id, :name, :on, :reachable]
end
