Feature: Test Filter Reset API call

  @TC_004
  Scenario: Verify default filters are applied even after filter reset API is called
    Given Open "Asset in Table View" under Asset Management
    And User select filter "Container"
    When User send a POST request for reseting the filter
    And API call got success with status code 200
    Then "Paired" filter should be enabled
    And "Container" filter should be disabled
