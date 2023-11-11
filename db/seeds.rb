# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
require 'csv'

AdminUser.create!(email: 'admin@example.com', password: 'password', password_confirmation: 'password') if Rails.env.development?

csv_text = File.read(Rails.root.join('db', 'seed_files', 'obolon_district.csv'))
csv = CSV.parse(csv_text, headers: true, encoding: 'UTF-8')

csv.each do |row|
  excluded_attributes = ['address', 'latitude', 'longitude', 'name']
  tags_hash = row.to_hash.except(*excluded_attributes).transform_values do |value|
    (value.to_s.downcase == 'true')
  end

  t = Location.new
  t.name = row['name']
  t.address = row['address']
  t.latitude = row['latitude'].to_f
  t.longitude = row['longitude'].to_f
  t.tags = tags_hash.to_json
  t.save

end

