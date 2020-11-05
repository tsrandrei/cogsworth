defmodule Cogsworth.Lights do
  alias Cogsworth.Lights.{Light, LightGroup}

  def zones do
    bridge()
    |> Huex.groups
    |> Enum.map(fn {k, v} ->
      %LightGroup{
        id: k,
        name: v["name"],
        brightness: v["action"]["bri"],
        on: v["state"]["any_on"],
        lights: Enum.map(v["lights"], fn id ->
          bridge()
          |> Huex.light_info(id)
          |> light_mappings(id)
          end)
      }
    end)
  end

  def bridge do
    # memoization?
    # auth with: 
    # bridge = Huex.connect("192.168.1.7") |> Huex.authorize("my-app#my-device")
    # :dets.insert(table, {:hue_username, "value" })
    {:ok, table} = :dets.open_file(:app_settings, type: :set)
    Huex.connect("192.168.1.7", :dets.lookup(table, :hue_username)[:hue_username])
  end

  # needed?
  defp light_mappings(light, id), do:
    %Light{
      id: id,
      name: light["name"],
      on: light["state"]["on"],
      reachable: light["state"]["reachable"]
    }
end
