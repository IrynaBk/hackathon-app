class Location < ApplicationRecord
    geocoded_by :address
    after_validation :geocode, if: :address_changed?

    def tags
        JSON.parse(self[:tags] || "{}")
      end

    def self.ransackable_attributes(auth_object = nil)
        %w[name address latitude longitude created_at updated_at tags]
    end
end
