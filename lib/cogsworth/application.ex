defmodule Cogsworth.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  def start(_type, _args) do
    children = [
      # Start the Telemetry supervisor
      CogsworthWeb.Telemetry,
      {Registry, keys: :unique, name: Registry.Cogsworth},
      # Start the PubSub system
      {Phoenix.PubSub, name: Cogsworth.PubSub},
      # {Cogsworth.LightsTracker, [name: LightsTracker, pubsub_server: Cogsworth.PubSub]},
      # Start the Endpoint (http/https)
      CogsworthWeb.Endpoint,
      {Absinthe.Subscription, CogsworthWeb.Endpoint}
      # Start a worker by calling: Cogsworth.Worker.start_link(arg)
      # {Cogsworth.Worker, arg}
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: Cogsworth.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  def config_change(changed, _new, removed) do
    CogsworthWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
