defmodule CogsworthWeb.ZonesView do
  use CogsworthWeb, :view
  alias CogsworthWeb.ZonesView
  alias CogsworthWeb.LightView

  def render("index.json", %{zones: zones}) do
    %{data: render_many(zones, ZonesView, "zone.json", as: :zone)}
  end

  def render("show.json", %{zone: zone}) do
    %{data: render_one(zone, ZonesView, "zone.json")}
  end

  def render("zone.json", %{zone: zone}) do
    %{
      id: zone.id,
      name: zone.name,
      brightness: zone.brightness,
      on: zone.on,
      lights: render_many(zone.lights, LightView, "light.json")
    }
  end
end
