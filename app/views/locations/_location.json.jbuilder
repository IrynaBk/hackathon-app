json.extract! location, :id, :name, :address, :latitude, :longitude, :created_at, :updated_at, :tags
json.url location_url(location, format: :json)
