Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins "http://localhost:3000"
    resource "*", headers: :any, methods: [
        :get, :post, :put, :patch, :delete, :options, :head
    ],
    credentials: true
  end

  allow do
    origins "https://mentallly.herokuapp.com"
    resource "*", headers: :any, methods: [
        :get, :post, :put, :patch, :delete, :options, :head
    ],
    credentials: true
  end


  allow do
    origins "https://awesome-kare-c984ee.netlify.com/"
    resource "*", headers: :any, methods: [
        :get, :post, :put, :patch, :delete, :options, :head
    ],
    credentials: true
  end



  allow do
    origins "http://localhost:3001"
    resource "*", headers: :any, methods: [
        :get, :post, :put, :patch, :delete, :options, :head
    ],
    credentials: true
  end

  allow do
    origins "https://mentallly-api.herokuapp.com"
    resource "*", headers: :any, methods: [
        :get, :post, :put, :patch, :delete, :options, :head
    ],
    credentials: true
  end

end