# Jekyll plugin for rapid post generation
# Usage: Create a new post by creating a file in _drafts/ with front matter, then run: bundle exec jekyll post "draft-filename"

module Jekyll
  class PostGenerator < Generator
    safe true
    priority :low

    def generate(site)
      # This plugin doesn't generate posts automatically
      # It provides helper methods for the command below
    end
  end
end

# Command to convert drafts to posts
# Add this to your Rakefile or run manually
module PostCreator
  def self.create_from_template(title:, date:, description:, content:, template: "ai_tutorial", **options)
    metadata = YAML.load_file("_data/post_metadata.yml")
    template_data = metadata["templates"][template] || {}
    
    # Generate filename
    filename_date = date.strftime("%Y-%m-%d")
    slug = title.downcase.strip.gsub(' ', '-').gsub(/[^\w\-]/, '')
    filename = "_posts/#{filename_date}-#{slug}.md"
    
    # Build front matter
    front_matter = {
      "layout" => "post",
      "title" => title,
      "date" => "#{date} 12:00:00 -0000",
      "description" => description
    }
    
    # Add template defaults
    front_matter.merge!(template_data)
    front_matter.merge!(options)
    
    # Create file content
    file_content = front_matter.to_yaml + "---\n\n#{content}"
    
    # Write file
    File.write(filename, file_content)
    puts "✅ Created post: #{filename}"
    filename
  end
end

# Make available in Jekyll context
module Jekyll
  class Post
    def self.create_from_template(**args)
      PostCreator.create_from_template(**args)
    end
  end
end
