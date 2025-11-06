# Task List

- [x] Fix CCA carryover message — update SecondaryYearPlanning CCA warning to reflect 100% skill retention on CCA change.
- [x] Investment modal submit UX — add returnKeyType, blurOnSubmit, and onSubmitEditing to buy quantity TextInput in InvestmentPortfolio modal.
- [x] Rebalance secondary stat gains — reduce academic/CCA/social scaling, soften stress, slow leadership/work-exp growth in SecondarySchoolService.
- [x] Continue routes by life stage — in WelcomeScreen handleContinue, navigate to correct screen based on player.lifeStageProgress.currentStage.
- [x] Sync UI age/stage display — ensure all screens displaying age/stage derive from lifeStageProgress and update after year transitions.
- [x] Remove backup screen file — delete screens/InvestmentPortfolio.tsx.backup from repo.
- [x] Tighten relaxed types — revert temporary relaxed typing in types/index.ts and GameService to strict enums for RandomEventData and signatures.
- [x] Add stage skip UI — expose visible controls on WelcomeScreen to jump to key life stages for debugging.
- [x] Increase gameplay difficulty — adjust primary and ongoing stat gains/penalties so maintaining happiness, health, wealth etc. is more challenging.
