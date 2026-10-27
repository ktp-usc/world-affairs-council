require "test_helper"

class HomeControllerTest < ActionDispatch::IntegrationTest
  test "renders the home page" do
    get root_url

    assert_response :success
    assert_select "header.site-header"
    assert_select "main#main-content"
    assert_select "h1", text: /Global issues/
    assert_select "footer.site-footer"
    assert_select "a[data-snake-trigger]", minimum: 2
    assert_select "[data-snake-game][hidden]"
    assert_select "script[src*='easter_egg']"
  end

  test "renders each primary information page" do
    [about_url, programs_url, student_programs_url, calendar_url, get_involved_url, news_url].each do |url|
      get url
      assert_response :success, "Expected #{url} to render successfully"
      assert_select "main#main-content"
    end
  end
end
