defmodule CogsworthWeb.LightsChannel do
  use Phoenix.Channel
  alias Cogsworth.Lights

  require Logger

  defstruct lights: []

  intercept ["sync"]

  def join("lights:all", _message, socket) do
    send(self(), :after_join)
    {:ok, socket}
  end

  def handle_info(:after_join, socket) do
    broadcast! socket, "sync", %{}    
    {:noreply, socket}
  end

  def handle_in("update:zone:" <> zone_id, %{"on" => on} = payload, socket) do
    Lights.bridge
      |>Lights.LightGroup.toggle(zone_id, on)
    {:noreply, socket}
  end

  def handle_in("update:zone:" <> zone_id, %{"brightness" => bri} = payload, socket) do
    Lights.bridge
      |>Lights.LightGroup.brightness(zone_id, bri)
    {:noreply, socket}
  end

  def handle_in("update:zone:" <> zone_id, %{"color" => [x, y]} = payload, socket) do
    Lights.bridge
      |>Lights.LightGroup.color(zone_id, x, y)
    {:noreply, socket}
  end

  def handle_out("sync", payload, socket) do
    broadcast! socket, "update:all", CogsworthWeb.ZonesView.render("index.json", zones: Lights.zones)
    {:noreply, socket}
  end
end
