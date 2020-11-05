defmodule CogsworthWeb.LightView do
  use CogsworthWeb, :view
  alias CogsworthWeb.LightView

  def render("index.json", %{lights: lights}) do
    %{data: render_many(lights, ZonesView, "light.json", as: :light)}
  end

  def render("show.json", %{light: light}) do
    %{data: render_one(light, ZonesView, "light.json")}
  end

  def render("light.json", %{light: light}) do
    %{
      id: light.id,
      name: light.name,
      on: light.on,
      reachable: light.reachable
    }
  end
end
