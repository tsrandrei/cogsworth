defmodule CogsworthWeb.ZonesController do
  use CogsworthWeb, :controller

  alias Cogsworth.Lights
  alias Cogsworth.Lights.Light

  def index(conn, _params) do
    render(conn, "index.json", zones: Lights.zones)
  end

  # def create(conn, %{"light" => light_params}) do
  #   with {:ok, %Light{} = light} <- Lights.create_light(light_params) do
  #     conn
  #     |> put_status(:created)
  #     |> put_resp_header("location", Routes.light_path(conn, :show, light))
  #     |> render("show.json", light: light)
  #   end
  # end

  # def show(conn, %{"id" => id}) do
  #   light = Lights.get_light!(id)
  #   render(conn, "show.json", light: light)
  # end

  # def update(conn, %{"id" => id, "light" => light_params}) do
  #   light = Lights.get_light!(id)

  #   with {:ok, %Light{} = light} <- Lights.update_light(light, light_params) do
  #     render(conn, "show.json", light: light)
  #   end
  # end

  # def delete(conn, %{"id" => id}) do
  #   light = Lights.get_light!(id)

  #   with {:ok, %Light{}} <- Lights.delete_light(light) do
  #     send_resp(conn, :no_content, "")
  #   end
  # end
end
