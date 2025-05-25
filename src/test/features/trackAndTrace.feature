Feature: Tests for Track & Trace  - Shipments

  Background:
    Given User is able to successfully login to the application

@TC_003
  Scenario: Verify filtering on Shipments Table View page
    Given Open "Shipments in Table View" under Track & Trace
    And Reset the filter if applicable
    When User deselect filter "Not Started"
    And User deselect filter "In Transit"
    When User select filter "Closed"
    Then Verify whether table results are filtered based on "Status" as "Closed"