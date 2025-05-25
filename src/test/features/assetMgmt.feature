Feature: Tests for Asset Management

  Background:
    Given User is able to successfully login to the application

  @TC_001
  Scenario: Verify filtering on Logger Table View page
    Given Open "Logger in Table View" under Asset Management
    When User select filter "Not Paired"
    Then Verify whether table results are filtered based on "Pairing Status" as "Not Paired"

 @TC_002
  Scenario: Verify filtering on Asset Table View page
    Given Open "Asset in Table View" under Asset Management
    When User select filter "Container"
    Then Verify whether table results are filtered based on "Asset Type" as "Container"
