require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name         = "react-native-job-queue"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.description  = <<-DESC
                  react-native-job-queue
                   DESC
  s.homepage     = "https://github.com/SimonErm/react-native-job-queue"
  s.license      = "MIT"
  # s.license    = { :type => "MIT", :file => "FILE_LICENSE" }
  s.authors      = { "Simon" => "simon_ermler@web.de" }
  s.platform     = :ios, "7.0"
  s.source       = { :git => "https://github.com/SimonErm/react-native-job-queue.git", :tag => "#{s.version}" }

  s.source_files = "ios/**/*.{h,m,swift}"
  s.requires_arc = true
  s.ios.library = "sqlite3"
  s.dependency "React"
	s.dependency 'SQLite.swift', '~> 0.12.0'
  # s.dependency "..."
end

