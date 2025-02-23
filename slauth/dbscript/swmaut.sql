-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: 115.79.136.114    Database: swmaut
-- ------------------------------------------------------
-- Server version	5.7.19-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `apps`
--

DROP TABLE IF EXISTS `apps`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `apps` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `APPCODE` varchar(65) NOT NULL,
  `APPNAME` varchar(255) NOT NULL,
  `DELETED` tinyint(1) NOT NULL,
  `URL` varchar(255) NOT NULL,
  `SIGNOUT_URL` varchar(255) DEFAULT '',
  `NOTES` varchar(255) DEFAULT '',
  `ADDDATE` datetime DEFAULT NULL,
  `ADDWHO` varchar(65) DEFAULT '',
  `EDITDATE` datetime DEFAULT NULL,
  `EDITWHO` varchar(65) DEFAULT '',
  `userxAppId` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `APPCODE_UNIQUE` (`APPCODE`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `codelist`
--

DROP TABLE IF EXISTS `codelist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `codelist` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `PARENTUSER` varchar(65) DEFAULT NULL,
  `LISTNAME` varchar(25) NOT NULL,
  `DESCRIPTION` varchar(60) DEFAULT '',
  `ADDDATE` datetime DEFAULT NULL,
  `ADDWHO` varchar(18) DEFAULT '',
  `EDITDATE` datetime DEFAULT NULL,
  `EDITWHO` varchar(18) DEFAULT '',
  `DELETED` tinyint(4) DEFAULT '0',
  PRIMARY KEY (`ID`),
  UNIQUE KEY `PARENTUSER_UNIQUE` (`PARENTUSER`,`LISTNAME`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `codelkup`
--

DROP TABLE IF EXISTS `codelkup`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `codelkup` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `PARENTUSER` varchar(65) DEFAULT NULL,
  `LISTNAME` varchar(50) NOT NULL,
  `CODE` varchar(25) NOT NULL,
  `DESCRIPTION` varchar(250) DEFAULT '',
  `SHORT` varchar(30) DEFAULT '',
  `LONG_VALUE` varchar(250) DEFAULT '',
  `ADDDATE` datetime DEFAULT NULL,
  `ADDWHO` varchar(18) DEFAULT '',
  `EDITDATE` datetime DEFAULT NULL,
  `EDITWHO` varchar(18) DEFAULT '',
  `NOTES` varchar(3072) DEFAULT '',
  `WOFLAG` int(11) DEFAULT '0',
  `LOT1` int(11) DEFAULT '0',
  `DELETED` tinyint(4) DEFAULT '0',
  PRIMARY KEY (`ID`),
  UNIQUE KEY `PARENTUSER_UNIQUE` (`PARENTUSER`,`LISTNAME`,`CODE`)
) ENGINE=InnoDB AUTO_INCREMENT=89 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `menu`
--

DROP TABLE IF EXISTS `menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `menu` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `APPCODE` varchar(65) NOT NULL,
  `MENUCODE` varchar(65) NOT NULL,
  `MENUNAME` varchar(255) NOT NULL,
  `MENUURL` varchar(255) NOT NULL,
  `DELETED` tinyint(4) NOT NULL,
  `NOTES` varchar(255) DEFAULT '',
  `ADDDATE` datetime DEFAULT NULL,
  `ADDWHO` varchar(65) DEFAULT '',
  `EDITDATE` datetime DEFAULT NULL,
  `EDITWHO` varchar(65) DEFAULT '',
  `rolexMenuId` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `MENUCODE_UNIQUE` (`MENUCODE`,`APPCODE`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `roles` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `ROLECODE` varchar(45) NOT NULL,
  `ROLENAME` varchar(45) NOT NULL,
  `PARENTUSER` varchar(65) NOT NULL,
  `DELETED` tinyint(4) NOT NULL,
  `NOTES` varchar(200) DEFAULT '',
  `ADDDATE` datetime DEFAULT NULL,
  `ADDWHO` varchar(65) DEFAULT '',
  `EDITDATE` datetime DEFAULT NULL,
  `EDITWHO` varchar(65) DEFAULT '',
  `userxRoleId` int(11) DEFAULT NULL,
  `rolexStorerId` int(11) DEFAULT NULL,
  `rolexWarehouseId` int(11) DEFAULT NULL,
  `rolexMenuId` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ROLECODE_UNIQUE` (`ROLECODE`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `rolexmenu`
--

DROP TABLE IF EXISTS `rolexmenu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rolexmenu` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `ROLECODE` varchar(45) NOT NULL,
  `APPCODE` varchar(65) NOT NULL,
  `MENUCODE` varchar(45) NOT NULL,
  `READONLY` tinyint(4) NOT NULL,
  `EDIT` tinyint(4) NOT NULL,
  `DELETED` tinyint(4) NOT NULL,
  `NOTES` varchar(200) DEFAULT '',
  `ADDDATE` datetime DEFAULT NULL,
  `ADDWHO` varchar(65) DEFAULT '',
  `EDITDATE` datetime DEFAULT NULL,
  `EDITWHO` varchar(65) DEFAULT '',
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ROLECODE_UNIQUE` (`ROLECODE`,`APPCODE`,`MENUCODE`)
) ENGINE=InnoDB AUTO_INCREMENT=365 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `rolexstorer`
--

DROP TABLE IF EXISTS `rolexstorer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rolexstorer` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `ROLECODE` varchar(45) NOT NULL,
  `STORERKEY` varchar(45) NOT NULL,
  `WAREHOUSECODE` varchar(45) NOT NULL,
  `DELETED` tinyint(4) NOT NULL,
  `NOTES` varchar(200) DEFAULT '',
  `ADDDATE` datetime NOT NULL,
  `ADDWHO` varchar(65) NOT NULL,
  `EDITDATE` datetime DEFAULT NULL,
  `EDITWHO` varchar(65) DEFAULT '',
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ROLECODE_UNIQUE` (`ROLECODE`,`STORERKEY`,`WAREHOUSECODE`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `rolexwarehouse`
--

DROP TABLE IF EXISTS `rolexwarehouse`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rolexwarehouse` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `ROLECODE` varchar(45) NOT NULL,
  `WAREHOUSECODE` varchar(45) NOT NULL,
  `DELETED` tinyint(4) NOT NULL,
  `NOTES` varchar(200) DEFAULT '',
  `ADDDATE` datetime DEFAULT NULL,
  `ADDWHO` varchar(65) DEFAULT '',
  `EDITDATE` datetime DEFAULT NULL,
  `EDITWHO` varchar(65) DEFAULT '',
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ROLECODE_UNIQUE` (`ROLECODE`,`WAREHOUSECODE`)
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `storer`
--

DROP TABLE IF EXISTS `storer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `storer` (
  `ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `WAREHOUSECODE` varchar(30) NOT NULL,
  `STORERKEY` varchar(15) NOT NULL,
  `TYPE` varchar(30) NOT NULL DEFAULT '1',
  `PARENTUSER` varchar(65) NOT NULL,
  `DELETED` tinyint(4) NOT NULL,
  `COMPANY` varchar(200) NOT NULL,
  `SOURCEVERSION` int(11) DEFAULT '0',
  `VAT` varchar(18) DEFAULT '',
  `ADDRESS1` varchar(200) DEFAULT '',
  `ADDRESS2` varchar(200) DEFAULT '',
  `ADDRESS3` varchar(45) DEFAULT '',
  `ADDRESS4` varchar(45) DEFAULT '',
  `CITY` varchar(45) DEFAULT '',
  `STATE` varchar(25) DEFAULT '',
  `ZIP` varchar(18) DEFAULT '',
  `COUNTRY` varchar(30) DEFAULT '',
  `ISOCNTRYCODE` varchar(10) DEFAULT '',
  `CONTACT1` varchar(30) DEFAULT '',
  `CONTACT2` varchar(30) DEFAULT '',
  `PHONE1` varchar(18) DEFAULT '',
  `PHONE2` varchar(18) DEFAULT '',
  `FAX1` varchar(18) DEFAULT '',
  `FAX2` varchar(18) DEFAULT '',
  `EMAIL1` varchar(60) DEFAULT '',
  `EMAIL2` varchar(60) DEFAULT '',
  `B_CONTACT1` varchar(30) DEFAULT '',
  `B_CONTACT2` varchar(30) DEFAULT '',
  `B_COMPANY` varchar(45) DEFAULT '',
  `B_ADDRESS1` varchar(45) DEFAULT '',
  `B_ADDRESS2` varchar(45) DEFAULT '',
  `B_ADDRESS3` varchar(45) DEFAULT '',
  `B_ADDRESS4` varchar(45) DEFAULT '',
  `B_CITY` varchar(45) DEFAULT '',
  `B_STATE` varchar(25) DEFAULT '',
  `B_ZIP` varchar(18) DEFAULT '',
  `B_COUNTRY` varchar(30) DEFAULT '',
  `B_ISOCNTRYCODE` varchar(10) DEFAULT '',
  `B_PHONE1` varchar(18) DEFAULT '',
  `B_PHONE2` varchar(18) DEFAULT '',
  `B_FAX1` varchar(18) DEFAULT '',
  `B_FAX2` varchar(18) DEFAULT '',
  `B_EMAIL1` varchar(60) DEFAULT '',
  `B_EMAIL2` varchar(60) DEFAULT '',
  `CREDITLIMIT` varchar(18) DEFAULT '',
  `CARTONGROUP` varchar(10) DEFAULT '',
  `PICKCODE` varchar(10) DEFAULT '',
  `CREATEPATASKONRFRECEIPT` varchar(10) DEFAULT '',
  `CALCULATEPUTAWAYLOCATION` varchar(10) DEFAULT '',
  `STATUS` varchar(18) DEFAULT '',
  `DEFAULTSTRATEGY` varchar(10) DEFAULT '',
  `DEFAULTSKUROTATION` varchar(10) DEFAULT '',
  `DEFAULTROTATION` varchar(1) DEFAULT '',
  `SCAC_CODE` varchar(4) DEFAULT '',
  `TITLE1` varchar(50) DEFAULT '',
  `TITLE2` varchar(50) DEFAULT '',
  `DESCRIPTION` varchar(50) DEFAULT '',
  `SUSR1` varchar(30) DEFAULT '',
  `SUSR2` varchar(30) DEFAULT '',
  `SUSR3` varchar(30) DEFAULT '',
  `SUSR4` varchar(30) DEFAULT '',
  `SUSR5` varchar(30) DEFAULT '',
  `SUSR6` varchar(30) DEFAULT '',
  `MULTIZONEPLPA` varchar(1) DEFAULT '',
  `CWOFLAG` varchar(1) DEFAULT '',
  `ROLLRECEIPT` varchar(1) DEFAULT '',
  `NOTES1` varchar(2000) DEFAULT '',
  `NOTES2` varchar(2000) DEFAULT '',
  `APPORTIONRULE` varchar(10) DEFAULT '',
  `ENABLEOPPXDOCK` varchar(1) DEFAULT '',
  `ALLOWOVERSHIPMENT` varchar(1) DEFAULT '',
  `MAXIMUMORDERS` int(11) DEFAULT '0',
  `MINIMUMPERCENT` decimal(12,6) DEFAULT '0.000000',
  `ORDERDATESTARTDAYS` int(11) DEFAULT '0',
  `ORDERDATEENDDAYS` int(11) DEFAULT '0',
  `ORDERTYPERESTRICT01` varchar(10) DEFAULT '',
  `ORDERTYPERESTRICT02` varchar(10) DEFAULT '',
  `ORDERTYPERESTRICT03` varchar(10) DEFAULT '',
  `ORDERTYPERESTRICT04` varchar(10) DEFAULT '',
  `ORDERTYPERESTRICT05` varchar(10) DEFAULT '',
  `ORDERTYPERESTRICT06` varchar(10) DEFAULT '',
  `OPPORDERSTRATEGYKEY` varchar(10) DEFAULT '',
  `RECEIPTVALIDATIONTEMPLATE` varchar(18) DEFAULT '',
  `ALLOWAUTOCLOSEFORPO` varchar(1) DEFAULT '',
  `ALLOWAUTOCLOSEFORASN` varchar(1) DEFAULT '',
  `ALLOWAUTOCLOSEFORPS` varchar(1) DEFAULT '',
  `ALLOWSYSTEMGENERATEDLPN` varchar(1) DEFAULT '',
  `ALLOWDUPLICATELICENSEPLATES` varchar(1) DEFAULT '',
  `ALLOWCOMMINGLEDLPN` varchar(1) DEFAULT '',
  `LPNBARCODESYMBOLOGY` varchar(60) DEFAULT '',
  `LPNBARCODEFORMAT` varchar(60) DEFAULT '',
  `ALLOWSINGLESCANRECEIVING` varchar(1) DEFAULT '',
  `LPNLENGTH` int(11) DEFAULT '0',
  `APPLICATIONID` varchar(2) DEFAULT '',
  `SSCC1STDIGIT` int(11) DEFAULT '0',
  `UCCVENDORNUMBER` varchar(9) DEFAULT '',
  `CaseLabelType` varchar(10) DEFAULT '',
  `AUTOPRINTLABELLPN` varchar(1) DEFAULT '',
  `AUTOPRINTLABELPUTAWAY` varchar(1) DEFAULT '',
  `LPNSTARTNUMBER` varchar(18) DEFAULT '',
  `NEXTLPNNUMBER` varchar(18) DEFAULT '',
  `LPNROLLBACKNUMBER` varchar(18) DEFAULT '',
  `BARCODECONFIGKEY` varchar(18) DEFAULT '',
  `DEFAULTPUTAWAYSTRATEGY` varchar(10) DEFAULT '',
  `AUTOCLOSEASN` varchar(1) DEFAULT '',
  `AUTOCLOSEPO` varchar(1) DEFAULT '',
  `TRACKINVENTORYBY` varchar(1) DEFAULT '',
  `DUPCASEID` varchar(1) DEFAULT '',
  `DEFAULTRETURNSLOC` varchar(10) DEFAULT '',
  `DEFAULTQCLOC` varchar(10) DEFAULT '',
  `PISKUXLOC` varchar(1) DEFAULT '',
  `CCSKUXLOC` varchar(1) DEFAULT '',
  `CCDISCREPANCYRULE` varchar(10) DEFAULT '',
  `CCADJBYRF` varchar(10) DEFAULT '',
  `ORDERBREAKDEFAULT` varchar(1) DEFAULT '',
  `SKUSETUPREQUIRED` varchar(1) DEFAULT '',
  `DEFAULTQCLOCOUT` varchar(10) DEFAULT '',
  `ENABLEPACKINGDEFAULT` varchar(1) DEFAULT '',
  `DEFAULTPACKINGLOCATION` varchar(10) DEFAULT '',
  `GENERATEPACKLIST` varchar(1) DEFAULT '',
  `PACKINGVALIDATIONTEMPLATE` varchar(10) DEFAULT '',
  `INSPECTATPACK` varchar(1) DEFAULT '',
  `ADDRESSOVERWRITEINDICATOR` varchar(1) DEFAULT '',
  `ACCOUNTINGENTITY` varchar(64) DEFAULT '',
  `CREATEOPPXDTASKS` int(11) DEFAULT '0',
  `ISSUEOPPXDTASKS` int(11) DEFAULT '0',
  `OPPXDPICKFROM` varchar(20) DEFAULT '',
  `OBXDSTAGE` varchar(20) DEFAULT '',
  `KSHIP_CARRIER` int(11) DEFAULT '0',
  `SPSUOMWEIGHT` varchar(10) DEFAULT '',
  `SPSUOMDIMENSION` varchar(10) DEFAULT '',
  `ADDDATE` datetime DEFAULT NULL,
  `ADDWHO` varchar(18) DEFAULT '',
  `EDITDATE` datetime DEFAULT NULL,
  `EDITWHO` varchar(18) DEFAULT '',
  `GROUPCODE` varchar(100) DEFAULT '',
  `LOT1` tinyint(4) DEFAULT '0',
  `LOT4` tinyint(4) DEFAULT '0',
  `LOT5` tinyint(4) DEFAULT '0',
  `LOT1_REPORT` tinyint(4) DEFAULT '0',
  `LOT4_REPORT` tinyint(4) DEFAULT '0',
  `LOT5_REPORT` tinyint(4) DEFAULT '0',
  `LOT2` tinyint(4) DEFAULT '0',
  `LOT2_REPORT` tinyint(4) DEFAULT '0',
  `LOT6` tinyint(4) DEFAULT '0',
  `LOT7` tinyint(4) DEFAULT '0',
  `LOT8` tinyint(4) DEFAULT '0',
  `LOT9` tinyint(4) DEFAULT '0',
  `LOT10` tinyint(4) DEFAULT '0',
  `LOT11` tinyint(4) DEFAULT '0',
  `LOT13` tinyint(4) DEFAULT '0',
  `LOTEXPORT` tinyint(4) DEFAULT '0',
  `UPCCODE` tinyint(4) DEFAULT '0',
  `GROUPOFCARGO` tinyint(4) DEFAULT '0',
  `PRIORITYUOM` tinyint(4) DEFAULT '0',
  `STOCKCOUNT_NSX` tinyint(4) DEFAULT '0',
  `STOCKCOUNT_HSD` tinyint(4) DEFAULT '0',
  `STOCKINFO` varchar(20) DEFAULT '',
  `FREEDAY` varchar(20) DEFAULT '',
  `ALLOCATESTRATEGYKEY` varchar(10) DEFAULT '',
  `AGEINDAYS` int(11) DEFAULT '0',
  `LOTTABLE` varchar(3072) DEFAULT '',
  `COUNTLOTTABLE` varchar(3072) DEFAULT '',
  `rolexStorerId` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `WHSEID_UNIQUE` (`WAREHOUSECODE`,`STORERKEY`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sysmail`
--

DROP TABLE IF EXISTS `sysmail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sysmail` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `APPCODE` varchar(65) NOT NULL,
  `USER` varchar(255) NOT NULL,
  `PASS` varchar(255) NOT NULL,
  `DELETED` tinyint(4) NOT NULL,
  `ISDEFAULT` tinyint(4) NOT NULL,
  `TYPE` varchar(10) NOT NULL,
  `HOST` varchar(65) NOT NULL,
  `SECURE` tinyint(4) NOT NULL,
  `PORT` int(11) NOT NULL,
  `NOTES` varchar(255) DEFAULT '',
  `ADDDATE` datetime DEFAULT NULL,
  `ADDWHO` varchar(65) DEFAULT '',
  `EDITDATE` datetime DEFAULT NULL,
  `EDITWHO` varchar(65) DEFAULT '',
  `appsId` int(11) DEFAULT NULL,
  `sysmailcol` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `USER_UNIQUE` (`USER`),
  UNIQUE KEY `APPCODE_UNIQUE` (`APPCODE`,`USER`)
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sysusers`
--

DROP TABLE IF EXISTS `sysusers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sysusers` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `USERNAME` varchar(65) NOT NULL,
  `PASSWORD` varchar(65) NOT NULL,
  `DELETED` tinyint(4) NOT NULL,
  `FULLNAME` varchar(255) NOT NULL,
  `TEL` varchar(45) NOT NULL,
  `EMAIL` varchar(128) NOT NULL,
  `STATUS` int(11) NOT NULL,
  `NOTES` varchar(200) DEFAULT '',
  `ADDDATE` datetime DEFAULT NULL,
  `ADDWHO` varchar(65) DEFAULT '',
  `EDITDATE` datetime DEFAULT NULL,
  `EDITWHO` varchar(65) DEFAULT '',
  PRIMARY KEY (`ID`),
  UNIQUE KEY `USERNAME_UNIQUE` (`USERNAME`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `USERNAME` varchar(65) NOT NULL,
  `PASSWORD` varchar(65) NOT NULL,
  `PARENTUSER` varchar(65) DEFAULT '',
  `DELETED` tinyint(4) NOT NULL,
  `FULLNAME` varchar(255) NOT NULL,
  `TEL` varchar(45) NOT NULL,
  `EMAIL` varchar(128) NOT NULL,
  `STATUS` int(11) NOT NULL,
  `TYPE` int(11) NOT NULL,
  `NOTES` varchar(200) DEFAULT '',
  `ADDDATE` datetime DEFAULT NULL,
  `ADDWHO` varchar(65) DEFAULT '',
  `EDITDATE` datetime DEFAULT NULL,
  `EDITWHO` varchar(65) DEFAULT '',
  `userxRoleId` int(11) DEFAULT NULL,
  `userxAppId` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `USERNAME_UNIQUE` (`USERNAME`)
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `userxapp`
--

DROP TABLE IF EXISTS `userxapp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `userxapp` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `USERNAME` varchar(65) NOT NULL,
  `APPCODE` varchar(65) NOT NULL,
  `DELETED` tinyint(1) DEFAULT '0',
  `NOTES` varchar(255) DEFAULT '',
  `ADDDATE` datetime DEFAULT NULL,
  `ADDWHO` varchar(65) DEFAULT '',
  `EDITWHO` varchar(65) DEFAULT '',
  `EDITDATE` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `USERNAME_UNIQUE` (`USERNAME`,`APPCODE`)
) ENGINE=InnoDB AUTO_INCREMENT=79 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `userxrole`
--

DROP TABLE IF EXISTS `userxrole`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `userxrole` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `USERNAME` varchar(65) NOT NULL,
  `ROLECODE` varchar(45) NOT NULL,
  `DELETED` tinyint(1) DEFAULT NULL,
  `NOTES` varchar(200) DEFAULT '',
  `ADDDATE` datetime DEFAULT NULL,
  `ADDWHO` varchar(65) DEFAULT '',
  `EDITDATE` datetime DEFAULT NULL,
  `EDITWHO` varchar(65) DEFAULT '',
  PRIMARY KEY (`ID`),
  UNIQUE KEY `USERNAME_UNIQUE` (`USERNAME`,`ROLECODE`)
) ENGINE=InnoDB AUTO_INCREMENT=82 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `warehouse`
--

DROP TABLE IF EXISTS `warehouse`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `warehouse` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `WAREHOUSECODE` varchar(10) NOT NULL,
  `WAREHOUSENAME` varchar(200) NOT NULL,
  `PARENTUSER` varchar(65) NOT NULL,
  `DELETED` tinyint(4) NOT NULL,
  `NOTES` varchar(60) DEFAULT '',
  `HIDE` tinyint(4) DEFAULT '0',
  `ADDDATE` datetime DEFAULT NULL,
  `ADDWHO` varchar(65) DEFAULT '',
  `EDITDATE` datetime DEFAULT NULL,
  `EDITWHO` varchar(65) DEFAULT '',
  `rolexStorerId` int(11) DEFAULT NULL,
  `rolexWarehouseId` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `WarehouseCode` (`WAREHOUSECODE`)
) ENGINE=InnoDB AUTO_INCREMENT=69 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-01-08 16:44:23
