defmodule Cogsworth.Lights.LightGroup do
  @enforce_keys [:id, :name]
  defstruct [:id, :name, :brightness, :on, :lights, :reachable]

  def toggle(bridge, group, on) when on == true, do:
    Huex.turn_group_on(bridge, group)
  def toggle(bridge, group, on) when on == false, do:
    Huex.turn_group_off(bridge, group)

  def brightness(bridge, group, brightness) do
    Huex.set_group_brightness(bridge, group, brightness / 255 )
  end

  def color(bridge, group, x, y) do
    Huex.set_group_color(bridge, group, {x, y})
  end
end
