Rails.application.routes.draw do
  root "home#show"
  get "about", to: "pages#about"
  get "programs", to: "pages#programs"
  get "student-programs", to: "pages#students", as: :student_programs
  get "calendar", to: "pages#calendar"
  get "get-involved", to: "pages#get_involved", as: :get_involved
  get "news", to: "pages#news"

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

end
