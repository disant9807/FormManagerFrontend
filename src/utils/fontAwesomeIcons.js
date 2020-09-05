import { library } from '@fortawesome/fontawesome-svg-core'
// import { fas } from '@fortawesome/pro-solid-svg-icons'
// library.add(fas) // весит около 1 мб

/*  МАНУАЛ
*   ГДЕ СМОТРЕТЬ ИКОНКИ? https://fontawesome.com/icons?d=gallery&m=pro
*   Убедитесь, что используется фильтр Pro Only
*
*   Как использовать:
*   нужно импортировать с префиксом fa название выбранной иконки
*
*   Примечание: WebStorm помогает с названием импортов
*   Примечание 2: полный пакет иконок fab весит чуть больше 1мб.
*   Импорт списка ниже чуть больше 100кб (11.03.2019)
*
*   Далее нужно добавить название импорта в library.add
*
*   После этого можно пользоваться иконками в любом разделе, используя компонент:
*   <font-awesome-icon icon="archive" size="2x" />
*   Документация по компоненту: https://github.com/FortAwesome/vue-fontawesome
*
*   ВАЖНО!!!! Добавляйте иконки в АЛФАВИТНОМ ПОРЯДКЕ!
* */

import { faAnalytics } from '@fortawesome/pro-solid-svg-icons/faAnalytics'
import { faAngleUp } from '@fortawesome/pro-solid-svg-icons/faAngleUp'
import { faAngleLeft } from '@fortawesome/pro-solid-svg-icons/faAngleLeft'
import { faArchive } from '@fortawesome/pro-solid-svg-icons/faArchive'
import { faAlignLeft } from '@fortawesome/pro-solid-svg-icons/faAlignLeft'
import { faAddressCard } from '@fortawesome/pro-solid-svg-icons/faAddressCard'
import { faArrowAltUp } from '@fortawesome/pro-solid-svg-icons/faArrowAltUp'
import { faArrowAltDown } from '@fortawesome/pro-solid-svg-icons/faArrowAltDown'
import { faBars } from '@fortawesome/pro-solid-svg-icons/faBars'
import { faBed } from '@fortawesome/pro-solid-svg-icons/faBed'
import { faBell } from '@fortawesome/pro-solid-svg-icons/faBell'
import { faBriefcase } from '@fortawesome/pro-solid-svg-icons/faBriefcase'
import { faBuilding } from '@fortawesome/pro-solid-svg-icons/faBuilding'
import { faBarcode } from '@fortawesome/pro-solid-svg-icons/faBarcode'
import { faCalendarAlt } from '@fortawesome/pro-solid-svg-icons/faCalendarAlt'
import { faCalendarCheck } from '@fortawesome/pro-solid-svg-icons/faCalendarCheck'
import { faCaretDown } from '@fortawesome/pro-solid-svg-icons/faCaretDown'
import { faChevronCircleDown } from '@fortawesome/pro-solid-svg-icons/faChevronCircleDown'
import { faChevronDown } from '@fortawesome/pro-solid-svg-icons/faChevronDown'
import { faChevronRight } from '@fortawesome/pro-solid-svg-icons/faChevronRight'
import { faCheck } from '@fortawesome/pro-solid-svg-icons/faCheck'
import { faCheckCircle } from '@fortawesome/pro-solid-svg-icons/faCheckCircle'
import { faCheckSquare } from '@fortawesome/pro-solid-svg-icons/faCheckSquare'
import { faCircle } from '@fortawesome/pro-solid-svg-icons/faCircle'
import { faCloudUpload } from '@fortawesome/pro-solid-svg-icons/faCloudUpload'
import { faCog } from '@fortawesome/pro-solid-svg-icons/faCog'
import { faCogs } from '@fortawesome/pro-solid-svg-icons/faCogs'
import { faCoffee } from '@fortawesome/pro-solid-svg-icons/faCoffee'
import { faComment } from '@fortawesome/pro-solid-svg-icons/faComment'
import { faCopy } from '@fortawesome/pro-solid-svg-icons/faCopy'
import { faCreditCard } from '@fortawesome/pro-solid-svg-icons/faCreditCard'
import { faClock } from '@fortawesome/pro-solid-svg-icons/faClock'
import { faCheckDouble } from '@fortawesome/pro-solid-svg-icons/faCheckDouble'
import { faDownload } from '@fortawesome/pro-solid-svg-icons/faDownload'
import { faDoorOpen } from '@fortawesome/pro-solid-svg-icons/faDoorOpen'
import { faEdit } from '@fortawesome/pro-solid-svg-icons/faEdit'
import { faEye } from '@fortawesome/pro-solid-svg-icons/faEye'
import { faExchange } from '@fortawesome/pro-solid-svg-icons/faExchange'
import { faFile } from '@fortawesome/pro-solid-svg-icons/faFile'
import { faFileAlt } from '@fortawesome/pro-solid-svg-icons/faFileAlt'
import { faFileArchive } from '@fortawesome/pro-solid-svg-icons/faFileArchive'
import { faFileExcel } from '@fortawesome/pro-solid-svg-icons/faFileExcel'
import { faFileWord } from '@fortawesome/pro-solid-svg-icons/faFileWord'
import { faFileImage } from '@fortawesome/pro-solid-svg-icons/faFileImage'
import { faFilePdf } from '@fortawesome/pro-solid-svg-icons/faFilePdf'
import { faFilePowerpoint } from '@fortawesome/pro-solid-svg-icons/faFilePowerpoint'
import { faFileVideo } from '@fortawesome/pro-solid-svg-icons/faFileVideo'
import { faFilter } from '@fortawesome/pro-solid-svg-icons/faFilter'
import { faFolder } from '@fortawesome/pro-solid-svg-icons/faFolder'
import { faFolderOpen } from '@fortawesome/pro-solid-svg-icons/faFolderOpen'
import { faFolderTree } from '@fortawesome/pro-solid-svg-icons/faFolderTree'
import { faEnvelope } from '@fortawesome/pro-solid-svg-icons/faEnvelope'
import { faFlag } from '@fortawesome/pro-solid-svg-icons/faFlag'
import { faFilePlus } from '@fortawesome/pro-solid-svg-icons/faFilePlus'
import { faGripVertical } from '@fortawesome/pro-solid-svg-icons/faGripVertical'
import { faHistory } from '@fortawesome/pro-solid-svg-icons/faHistory'
import { faHomeLgAlt } from '@fortawesome/pro-solid-svg-icons/faHomeLgAlt'
import { faInfo } from '@fortawesome/pro-solid-svg-icons/faInfo'
import { faLockAlt } from '@fortawesome/pro-solid-svg-icons/faLockAlt'
import { faLink } from '@fortawesome/pro-solid-svg-icons/faLink'
import { faList } from '@fortawesome/pro-solid-svg-icons/faList'
import { faFemale } from '@fortawesome/pro-solid-svg-icons/faFemale'
import { faMale } from '@fortawesome/pro-solid-svg-icons/faMale'
import { faMap } from '@fortawesome/pro-solid-svg-icons/faMap'
import { faMapMarkerAlt } from '@fortawesome/pro-solid-svg-icons/faMapMarkerAlt'
import { faMinus } from '@fortawesome/pro-solid-svg-icons/faMinus'
import { faMinusCircle } from '@fortawesome/pro-solid-svg-icons/faMinusCircle'
import { faMoneyBillAlt } from '@fortawesome/pro-solid-svg-icons/faMoneyBillAlt'
import { faPaperclip } from '@fortawesome/pro-solid-svg-icons/faPaperclip'
import { faPrint } from '@fortawesome/pro-solid-svg-icons/faPrint'
import { faPaintBrushAlt } from '@fortawesome/pro-solid-svg-icons/faPaintBrushAlt'
import { faPause } from '@fortawesome/pro-solid-svg-icons/faPause'
import { faPauseCircle } from '@fortawesome/pro-solid-svg-icons/faPauseCircle'
import { faPaste } from '@fortawesome/pro-solid-svg-icons/faPaste'
import { faPhone } from '@fortawesome/pro-solid-svg-icons/faPhone'
import { faPlay } from '@fortawesome/pro-solid-svg-icons/faPlay'
import { faPlusSquare } from '@fortawesome/pro-solid-svg-icons/faPlusSquare'
import { faPlus } from '@fortawesome/pro-solid-svg-icons/faPlus'
import { faPlus as falPlus } from '@fortawesome/pro-light-svg-icons/faPlus'
import { faPlusCircle } from '@fortawesome/pro-solid-svg-icons/faPlusCircle'
import { faPowerOff } from '@fortawesome/pro-solid-svg-icons/faPowerOff'
import { faPencilAlt } from '@fortawesome/pro-solid-svg-icons/faPencilAlt'
import { faQuestionCircle } from '@fortawesome/pro-solid-svg-icons/faQuestionCircle'
import { faRandom } from '@fortawesome/pro-solid-svg-icons/faRandom'
import { faReply } from '@fortawesome/pro-solid-svg-icons/faReply'
import { faRubleSign } from '@fortawesome/pro-solid-svg-icons/faRubleSign'
import { faSave } from '@fortawesome/pro-solid-svg-icons/faSave'
import { faSearch } from '@fortawesome/pro-solid-svg-icons/faSearch'
import { faShoppingCart } from '@fortawesome/pro-solid-svg-icons/faShoppingCart'
import { faSignOutAlt } from '@fortawesome/pro-solid-svg-icons/faSignOutAlt'
import { faSignInAlt } from '@fortawesome/pro-solid-svg-icons/faSignInAlt'
import { faSort } from '@fortawesome/pro-solid-svg-icons/faSort'
import { faSortUp } from '@fortawesome/pro-solid-svg-icons/faSortUp'
import { faSortDown } from '@fortawesome/pro-solid-svg-icons/faSortDown'
import { faStop } from '@fortawesome/pro-solid-svg-icons/faStop'
import { faStar } from '@fortawesome/pro-solid-svg-icons/faStar'
import { faStars } from '@fortawesome/pro-solid-svg-icons/faStars'
import { faStarHalfAlt } from '@fortawesome/pro-solid-svg-icons/faStarHalfAlt'
import { faSyncAlt } from '@fortawesome/pro-solid-svg-icons/faSyncAlt'
import { faSuitcaseRolling } from '@fortawesome/pro-solid-svg-icons/faSuitcaseRolling'
import { faScanner } from '@fortawesome/pro-solid-svg-icons/faScanner'
import { faThumbsDown } from '@fortawesome/pro-solid-svg-icons/faThumbsDown'
import { faThumbtack } from '@fortawesome/pro-solid-svg-icons/faThumbtack'
import { faTimes } from '@fortawesome/pro-solid-svg-icons/faTimes'
import { faTrashAlt } from '@fortawesome/pro-solid-svg-icons/faTrashAlt'
import { faTruck } from '@fortawesome/pro-solid-svg-icons/faTruck'
import { faTag } from '@fortawesome/pro-solid-svg-icons/faTag'
import { faTimesSquare } from '@fortawesome/pro-solid-svg-icons/faTimesSquare'
import { faTimesCircle } from '@fortawesome/pro-solid-svg-icons/faTimesCircle'
import { faUniversity } from '@fortawesome/pro-solid-svg-icons/faUniversity'
import { faUndo } from '@fortawesome/pro-solid-svg-icons/faUndo'
import { faUser } from '@fortawesome/pro-solid-svg-icons/faUser'
import { faUser as falUser } from '@fortawesome/pro-light-svg-icons/faUser'
import { faUserHardHat } from '@fortawesome/pro-solid-svg-icons/faUserHardHat'
import { faUserCircle } from '@fortawesome/pro-solid-svg-icons/faUserCircle'
import { faUsers } from '@fortawesome/pro-solid-svg-icons/faUsers'
import { faUserPlus } from '@fortawesome/pro-solid-svg-icons/faUserPlus'
import { faUserPlus as farUserPlus } from '@fortawesome/pro-regular-svg-icons/faUserPlus'
import { faUtensils } from '@fortawesome/pro-solid-svg-icons/faUtensils'

import { faTelegram } from '@fortawesome/free-brands-svg-icons/faTelegram'

import { faCalendarAlt as falCalendarAlt } from '@fortawesome/pro-light-svg-icons/faCalendarAlt'
import { faCircle as falCircle } from '@fortawesome/pro-light-svg-icons/faCircle'
import { faEye as falEye } from '@fortawesome/pro-light-svg-icons/faEye'
import { faFileImage as falFileImage } from '@fortawesome/pro-light-svg-icons/faFileImage'
import { faFolderTree as falFolderTree } from '@fortawesome/pro-light-svg-icons/faFolderTree'
import { faGripVertical as falGripVertical } from '@fortawesome/pro-light-svg-icons/faGripVertical'
import { faSave as falSave } from '@fortawesome/pro-light-svg-icons/faSave'

import { faArrowCircleRight as farArrowCircleRight } from '@fortawesome/pro-regular-svg-icons/faArrowCircleRight'
import { faArrowCircleLeft as farArrowCircleLeft } from '@fortawesome/pro-regular-svg-icons/faArrowCircleLeft'
import { faAt as farAt } from '@fortawesome/pro-regular-svg-icons/faAt'
import { faBook as farBook } from '@fortawesome/pro-regular-svg-icons/faBook'
import { faCameraRetro as farCameraRetro } from '@fortawesome/pro-regular-svg-icons/faCameraRetro'
import { faCarBattery as farCarBattery } from '@fortawesome/pro-regular-svg-icons/faCarBattery'
import { faChartBar as farChartBar } from '@fortawesome/pro-regular-svg-icons/faChartBar'
import { faChartLine as farChartLine } from '@fortawesome/pro-regular-svg-icons/faChartLine'
import { faCheck as farCheck } from '@fortawesome/pro-regular-svg-icons/faCheck'
import { faChalkboard as farChalkboard } from '@fortawesome/pro-regular-svg-icons/faChalkboard'
import { faCity as farCity } from '@fortawesome/pro-regular-svg-icons/faCity'
import { faCircle as farCircle } from '@fortawesome/pro-regular-svg-icons/faCircle'
import { faClipboardCheck as farClipboardCheck } from '@fortawesome/pro-regular-svg-icons/faClipboardCheck'
import { faColumns as farColumns } from '@fortawesome/pro-regular-svg-icons/faColumns'
import { faCrown as farCrown } from '@fortawesome/pro-regular-svg-icons/faCrown'
import { faEnvelope as farEnvelope } from '@fortawesome/pro-regular-svg-icons/faEnvelope'
import { faEyeSlash as farEyeSlash } from '@fortawesome/pro-regular-svg-icons/faEyeSlash'
import { faExclamationCircle as farExclamationCircle } from '@fortawesome/pro-regular-svg-icons/faExclamationCircle'
import { faExclamationTriangle as farExclamationTriangle } from '@fortawesome/pro-regular-svg-icons/faExclamationTriangle'
import { faEllipsisH as farEllipsisH } from '@fortawesome/pro-regular-svg-icons/faEllipsisH'
import { faFileWord as farFileWord } from '@fortawesome/pro-regular-svg-icons/faFileWord'
import { faFolderOpen as farFolderOpen } from '@fortawesome/pro-regular-svg-icons/faFolderOpen'
import { faFolderPlus as farFolderPlus } from '@fortawesome/pro-regular-svg-icons/faFolderPlus'
import { faHashtag as farHashtag } from '@fortawesome/pro-regular-svg-icons/faHashtag'
import { faInfoCircle as farInfoCircle } from '@fortawesome/pro-regular-svg-icons/faInfoCircle'
import { faKey as farKey } from '@fortawesome/pro-regular-svg-icons/faKey'
import { faListAlt as farListAlt } from '@fortawesome/pro-regular-svg-icons/faListAlt'
import { faMars as farMars } from '@fortawesome/pro-regular-svg-icons/faMars'
import { faMemory as farMemory } from '@fortawesome/pro-regular-svg-icons/faMemory'
import { faMoneyBillAlt as farMoneyBillAlt } from '@fortawesome/pro-regular-svg-icons/faMoneyBillAlt'
import { faPencilAlt as farPencilAlt } from '@fortawesome/pro-regular-svg-icons/faPencilAlt'
import { faSave as farSave } from '@fortawesome/pro-regular-svg-icons/faSave'
import { faSmile as farSmile } from '@fortawesome/pro-regular-svg-icons/faSmile'
import { faSnowflake as farSnowflake } from '@fortawesome/pro-regular-svg-icons/faSnowflake'
import { faSortAmountDown as farSortAmountDown } from '@fortawesome/pro-regular-svg-icons/faSortAmountDown'
import { faStar as farStar } from '@fortawesome/pro-regular-svg-icons/faStar'
import { faStream as farStream } from '@fortawesome/pro-regular-svg-icons/faStream'
import { faTags as farTags } from '@fortawesome/pro-regular-svg-icons/faTags'
import { faThumbtack as farThumbtack } from '@fortawesome/pro-regular-svg-icons/faThumbtack'
import { faTruck as farTruck } from '@fortawesome/pro-regular-svg-icons/faTruck'
import { faUsersCog as farUsersCog } from '@fortawesome/pro-regular-svg-icons/faUsersCog'
import { faVenus as farVenus } from '@fortawesome/pro-regular-svg-icons/faVenus'

import { faSpinner as fadSpinner } from '@fortawesome/pro-duotone-svg-icons/faSpinner'
import { faPaperPlane as fadPaperPlane } from '@fortawesome/pro-duotone-svg-icons/faPaperPlane'

library.add(
  // A
  faAnalytics,
  faAngleUp,
  faAngleLeft,
  faAlignLeft,
  faAddressCard,
  faArchive,
  farAt,
  faArrowAltUp,
  faArrowAltDown,
  farArrowCircleRight,
  farArrowCircleLeft,

  // B
  faBars,
  faBed,
  faBell,
  farBook,
  faBriefcase,
  faBuilding,
  faBarcode,

  // C
  faCalendarAlt,
  falCalendarAlt,
  faCalendarCheck,
  farCameraRetro,
  farCarBattery,
  faCaretDown,
  farChalkboard,
  farChartBar,
  farChartLine,
  faCheck,
  farCheck,
  farCity,
  faCircle,
  falCircle,
  farCircle,
  faChevronCircleDown,
  faChevronDown,
  faChevronRight,
  faCheckCircle,
  faCheckDouble,
  faCheckSquare,
  farClipboardCheck,
  faCloudUpload,
  faCog,
  faCogs,
  faCoffee,
  faComment,
  faCopy,
  faCreditCard,
  farCrown,
  faClock,
  farColumns,

  // D
  faDoorOpen,
  faDownload,

  // E
  faEdit,
  farEllipsisH,
  farEnvelope,
  faEnvelope,
  faEye,
  falEye,
  farEyeSlash,
  faExchange,
  farExclamationTriangle,
  farExclamationCircle,

  // F
  faFile,
  faFilePdf,
  faFileAlt,
  faFileArchive,
  faFileExcel,
  faFileImage,
  falFileImage,
  faFileWord,
  farFileWord,
  faFilePdf,
  faFilePowerpoint,
  faFileVideo,
  faFilter,
  faFolder,
  faFolderOpen,
  farFolderOpen,
  farFolderPlus,
  faFolderTree,
  falFolderTree,
  faFlag,
  faFilePlus,

  // G
  // H
  farHashtag,
  faHistory,
  faHomeLgAlt,

  // I
  faInfo,
  farInfoCircle,

  // G
  faGripVertical,
  falGripVertical,

  // K
  farKey,

  // L
  faLink,
  faList,
  farListAlt,
  faLockAlt,

  // M
  faFemale,
  faMale,
  faMap,
  faMapMarkerAlt,
  faMinus,
  faMinusCircle,
  farMemory,
  farMars,
  faMoneyBillAlt,
  farMoneyBillAlt,

  // N
  // O
  // P
  faPaperclip,
  fadPaperPlane,
  faPause,
  faPauseCircle,
  faPlusCircle,
  faPencilAlt,
  faPrint,
  faPaintBrushAlt,

  faPaste,
  farPencilAlt,
  faPhone,
  faPlay,
  faPlusSquare,
  faPlus,
  falPlus,
  faPowerOff,

  // Q
  faQuestionCircle,

  // R
  faRandom,
  faReply,
  faRubleSign,

  // S
  falSave,
  farSave,
  faSave,
  faSearch,
  faScanner,
  faShoppingCart,
  faSignOutAlt,
  faSignInAlt,
  farSmile,
  farSnowflake,
  faSort,
  faSortUp,
  faSortDown,
  farSortAmountDown,
  fadSpinner,
  faStar,
  farStar,
  faStars,
  faStarHalfAlt,
  farStream,
  faStop,
  faSyncAlt,
  faSuitcaseRolling,

  // T
  faTelegram,
  faThumbsDown,
  faTimes,
  faTrashAlt,
  faTruck,
  farTruck,
  faTag,
  farTags,
  faTimesSquare,
  faTimesCircle,
  faThumbtack,
  farThumbtack,

  // U
  faUniversity,
  faUndo,
  faUserCircle,
  faUserHardHat,
  faUser,
  falUser,
  faUsers,
  farUsersCog,
  faUserPlus,
  farUserPlus,
  faUtensils,

  // V
  farVenus
  // X, Y, Z
)
