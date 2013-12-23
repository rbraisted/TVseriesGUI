SetCsh(0,"Service_Activation",1,"54-0890/Getting_Started/Service_Activation.htm");
SetCsh(1,"Establishing_No_Transmit_Zones",2,"54-0890/No-Transmit_Zones/Establishing_No-Transmit_Zones.htm");
SetCsh(2,"Configuring_Computers_for_DHCP",4,"54-0890/Network_Configuration/Configuring_Computers_for_DHCP.htm");
SetCsh(3,"Error_Messages",6,"54-0890/Troubleshooting/Error_Messages.htm");
SetCsh(4,"Wiring_Diagram",8,"54-0890/Wiring_Diagram/Wiring_Diagram1.htm");
SetCsh(5,"Tips_for_Minimizing_Data_Usage",5,"54-0890/Data_Connections/Tips_for_Minimizing_Data_Usage.htm");
SetCsh(6,"Software_Updates",7,"54-0890/Maintenance/Software_Updates.htm");
SetCsh(7,"Making_a_Ship_to_Shore_Call",3,"54-0890/Voice_Connections/Making_a_Ship-to-Shore_Call.htm");

addWindow("NewWindow",true,0,"","","","","NewWindow",2,2,"toc|ndx|nls|gls","toc");



putCshData(gsProjPath,gaCsh,gaWindow,gaRmtProj);
