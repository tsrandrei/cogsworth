defmodule CogsworthWeb.PageController do
  use CogsworthWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
