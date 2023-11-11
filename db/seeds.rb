require 'csv'
require_relative '../db/seed_files/headers_mapping'


def create_tags(row)
    tags_to_add = row.to_hash.select { |col_name, value| value.to_s.downcase == 'true' }
    tags_to_add.map do |col_name, _|
      Tag.find_or_create_by(name: HEADER_MAPPING[col_name])
    end
end


AdminUser.create!(email: 'admin@example.com', password: 'password', password_confirmation: 'password') if Rails.env.development?

csv_text = File.read(Rails.root.join('db', 'seed_files', 'obolon_district.csv'))
csv = CSV.parse(csv_text, headers: true, encoding: 'UTF-8')

csv.each do |row|
    t = Location.new
    t.name = row['name']
    t.address = row['address']
    t.latitude = row['latitude'].to_f
    t.longitude = row['longitude'].to_f
  
    t.tags = create_tags(row)
  
    t.save
  end

